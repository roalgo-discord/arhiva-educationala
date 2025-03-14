import copy
import os
import frontmatter
from mkdocs.structure.files import Files, InclusionLevel
from mkdocs.config import Config
from mkdocs.structure.nav import Navigation, Section
from mkdocs.structure.pages import Page
from mkdocs.plugins import log


def on_nav(nav: Navigation, config: Config, files: Files) -> Navigation:
    """Filter out draft files and remove them from the navigation."""

    # I hate that I have to do this, but currently Mkdocs expects hooks to be of
    # <class 'str'>, so I can't have dicts to do enabled: !ENV [CI, false].
    if os.getenv("CI", "").strip().lower() not in ("1", "yes", "on", "true"):
        return nav

    draft_files = set()
    processed_files = set()

    for file in files.documentation_pages():
        if file.src_uri not in processed_files:
            try:
                with open(file.abs_src_path, "r", encoding="utf-8") as f:
                    metadata = frontmatter.load(f).metadata
                    if metadata.get("draft", False):
                        draft_files.add(file.src_uri)
                        file.inclusion = InclusionLevel.DRAFT
                processed_files.add(file.src_uri)
            except Exception as e:
                log.warning(f"Error reading frontmatter for {file.abs_src_path}: {e}")

    def filter_nav_items(nav_items):
        """Recursively filter out draft pages and empty sections from navigation."""
        i = 0
        while i < len(nav_items):
            item = nav_items[i]
            if isinstance(item, Section):
                item.children = filter_nav_items(item.children)
                if not item.children:
                    del nav_items[i]
                    continue
            elif isinstance(item, Page):
                if item.file and item.file.src_uri in draft_files:
                    del nav_items[i]
                    continue
            i += 1

        return nav_items

    filter_nav_items(nav.items)

    return nav
