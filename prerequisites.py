import json
import os
import sys
import frontmatter
import yaml
from pathlib import Path

DIFFICULTY_ORDER = {"cppintro": 0, "usor": 1, "mediu": 2, "dificil": 3, "avansat": 4}
articles = {}

DATA_DIR = Path("data")
HASHES_FILE = DATA_DIR / "hashes.json"
PREREQ_FILE = DATA_DIR / "prerequisites.json"

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
    DATA_DIR.mkdir(exist_ok=True)
    PREREQ_FILE.touch(exist_ok=True)


def load_nav_structure():
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
        nav_structure = {}

        def traverse(nav_item, title=None):
            if isinstance(nav_item, dict):
                for sub_title, sub_path in nav_item.items():
                    if isinstance(sub_path, str) and sub_path.endswith(".md"):
                        nav_structure[sub_path] = sub_title
                    elif isinstance(sub_path, list):
                        traverse(sub_path, sub_title)
            elif isinstance(nav_item, list):
                for item in nav_item:
                    traverse(item, title)

        traverse(section)
        return nav_structure

    return parse_nav(nav_data["nav"])


def parse_front_matter(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            return frontmatter.loads(file.read())
    except ValueError:
        return None


def process_articles():
    global articles
    nav_structure = load_nav_structure()

    for file_path in nav_structure:
        for root, _, files in os.walk("docs"):
            rel_path = os.path.relpath(root, "docs")
            difficulty = rel_path.split(os.sep)[0]

            if difficulty not in DIFFICULTY_ORDER:
                continue

            for file in files:
                if file.endswith(".md"):
                    filepath = os.path.join(root, file)

                    if filepath.endswith(file_path):
                        metadata = parse_front_matter(filepath)
                        if metadata and "id" in metadata:
                            articles[metadata["id"]] = {
                                "id": metadata["id"],
                                "path": filepath,
                                "difficulty": difficulty,
                                "prerequisites": metadata.get("prerequisites", []),
                                "title": metadata.get(
                                    "title", nav_structure[file_path]
                                ),
                            }

    update_prerequisites()


def update_prerequisites():
    prerequisites_data = {}

    for article_id, data in articles.items():
        prerequisites_list = data["prerequisites"]
        if prerequisites_list:
            prerequisites_data[article_id] = [
                {
                    "id": prereq_id,
                    "path": articles[prereq_id]["path"],
                    "difficulty": articles[prereq_id]["difficulty"],
                    "title": articles[prereq_id]["title"],
                }
                for prereq_id in prerequisites_list
                if prereq_id in articles
            ]

    if prerequisites_data:
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

    if "prerequisites" in page.meta:
        prerequisites_list = page.meta["prerequisites"]
        seen_prerequisites = set()

        for prerequisite_id in prerequisites_list:
            if prerequisite_id in articles:
                prereq = articles[prerequisite_id]

                if prerequisite_id not in seen_prerequisites:
                    prerequisite_copy = {
                        "id": prereq["id"],
                        "path": prereq["path"],
                        "difficulty": DIFFICULTY_ORDER.get(prereq["difficulty"], -1),
                        "title": prereq["title"],
                    }
                    prerequisites_data.append(prerequisite_copy)
                    seen_prerequisites.add(prerequisite_id)

    context["prerequisites_data"] = prerequisites_data
    return context
