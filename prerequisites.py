import json
import os
import pprint
import sys
import frontmatter
import yaml
from pathlib import Path
import concurrent.futures
from multiprocessing import Pool

DIFFICULTY_ORDER = {
    "cppintro": 0,
    "usor": 1,
    "mediu": 2,
    "dificil": 3,
    "avansat": 4,
    "olimpiada": 5,
}
articles = {}

DATA_DIR = Path("data")
PREREQ_FILE = DATA_DIR / "prerequisites.json"
NAV_FILE = DATA_DIR / "nav.json"


empty_loader = lambda loader, suffix, node: None
yaml.add_multi_constructor("!", empty_loader)
yaml.add_multi_constructor(
    "tag:yaml.org,2002:python/name", empty_loader, Loader=yaml.SafeLoader
)
yaml.add_multi_constructor(
    "tag:yaml.org,2002:python/object", empty_loader, Loader=yaml.SafeLoader
)
yaml.add_multi_constructor("!ENV", empty_loader, Loader=yaml.SafeLoader)


def ensure_data_files():
    """Ensure the data directory and necessary JSON files exist."""
    DATA_DIR.mkdir(exist_ok=True)
    PREREQ_FILE.touch(exist_ok=True)
    PREREQ_FILE.write_text("{}")


def load_nav_structure():
    """Load the 'nav' section from mkdocs.yml."""
    if os.path.exists(NAV_FILE):
        try:
            with NAV_FILE.open(encoding="utf-8") as f:
                nav_structure = json.load(f)
                return nav_structure
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading cache: {e}", file=sys.stderr)

    try:
        with open("mkdocs.yml", "r", encoding="utf-8") as f:
            nav_data = yaml.safe_load(f) or {}
    except (FileNotFoundError, yaml.YAMLError) as e:
        print(f"Error loading mkdocs.yml: {e}", file=sys.stderr)
        return {}

    if not isinstance(nav_data, dict) or "nav" not in nav_data:
        print("Warning: 'nav' section missing in mkdocs.yml", file=sys.stderr)
        return {}

    def parse_nav(section):
        """Recursively parse the 'nav' section of mkdocs.yml using a generator."""

        def traverse(nav_item, title=None):
            if isinstance(nav_item, dict):
                for sub_title, sub_path in nav_item.items():
                    if isinstance(sub_path, str) and sub_path.endswith(".md"):
                        yield sub_path, sub_title
                    elif isinstance(sub_path, list):
                        yield from traverse(sub_path, sub_title)
            elif isinstance(nav_item, list):
                for item in nav_item:
                    yield from traverse(item, title)

        yield from traverse(section)

    nav_structure = {}
    for sub_path, metadata in parse_nav(nav_data["nav"]):
        nav_structure[sub_path] = metadata

    try:
        with NAV_FILE.open("w", encoding="utf-8") as f:
            json.dump(nav_structure, f, ensure_ascii=False)
    except IOError as e:
        print(f"Error saving cache: {e}", file=sys.stderr)

    return parse_nav(nav_data["nav"])


def parse_front_matter(filepath):
    """Extract front matter from a Markdown file."""
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            return frontmatter.loads(file.read())
    except ValueError:
        return None


def process_article(file_path, nav_structure):
    """Process a single article, mapping it to its prerequisites."""
    articles = {}
    rel_path = file_path.relative_to("docs")
    difficulty = rel_path.parts[0] if rel_path.parts else None
    if difficulty not in DIFFICULTY_ORDER:
        return articles

    if str(rel_path) in nav_structure:
        metadata = parse_front_matter(file_path)
        if metadata and "id" in metadata:
            article_id = metadata["id"]
            articles[article_id] = {
                "id": article_id,
                "path": rel_path,
                "difficulty": DIFFICULTY_ORDER.get(difficulty, -1),
                "prerequisites": metadata.get("prerequisites", []),
                "title": metadata.get("title", nav_structure[str(rel_path)]),
            }
    return articles


def process_articles():
    """Process all articles and map each article to its prerequisites."""
    global articles
    nav_structure = load_nav_structure()

    exclude_dirs = {"images", "javascripts", "stylesheets", "codes"}

    files_to_process = [
        file_path
        for file_path in Path("docs").rglob("*.md")
        if not any(
            file_path.parts[i] in exclude_dirs for i in range(len(file_path.parts))
        )
    ]

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(
            lambda file: process_article(file, nav_structure), files_to_process
        )

    for result in results:
        articles.update(result)

    update_prerequisites_json()


def update_prerequisites_json():
    """Update prerequisites JSON efficiently using the articles cache."""
    prerequisites_data = {
        article_id: [
            {
                "id": prereq_id,
                "path": articles[prereq_id]["path"].as_posix()[: -len(".md")],
                "difficulty": articles[prereq_id]["difficulty"],
                "title": articles[prereq_id]["title"],
            }
            for prereq_id in data["prerequisites"]
            if prereq_id in articles
        ]
        for article_id, data in articles.items()
        if data["prerequisites"]
    }

    if prerequisites_data:
        existing_data = {}
        if PREREQ_FILE.exists():
            with open(PREREQ_FILE, "r", encoding="utf-8") as f:
                existing_data = json.load(f)

        if existing_data != prerequisites_data:
            with open(PREREQ_FILE, "w", encoding="utf-8") as json_file:
                json.dump(prerequisites_data, json_file, ensure_ascii=False)


def on_pre_build(config, **kwargs):
    if not os.path.exists(PREREQ_FILE):
        ensure_data_files()

    process_articles()


def on_page_context(context, page, config, **kwargs):
    """Add only direct prerequisites data to page context."""
    prerequisites_data = []
    global articles

    if not articles:
        process_articles()

    page_path = Path(page.file.src_path)
    difficulty_str = page_path.parts[0] if page_path.parts else ""
    difficulty = DIFFICULTY_ORDER.get(difficulty_str, -1)

    prerequisites_list = page.meta.get("prerequisites", [])
    seen_prerequisites = set()

    for prerequisite_id in prerequisites_list:
        if prerequisite_id in articles and prerequisite_id not in seen_prerequisites:
            prereq = articles[prerequisite_id]
            prerequisites_data.append(
                {
                    "id": prereq["id"],
                    "path": prereq["path"].as_posix()[: -len(".md")] + "/",
                    "difficulty": prereq["difficulty"],
                    "title": prereq["title"],
                }
            )
            seen_prerequisites.add(prerequisite_id)

    prerequisites_data.sort(key=lambda x: (x["difficulty"], x["title"]))
    context["prerequisites_data"] = prerequisites_data
    context["difficulty"] = difficulty

    return context
