import msgpack
import os
import sys
import frontmatter
import yaml

from pathlib import Path
import concurrent.futures

DIFFICULTY_ORDER = {
    "cppintro": 0,
    "usor": 1,
    "mediu": 2,
    "dificil": 3,
    "avansat": 4,
    "olimpiada": 5,
}

articles = []
id_to_numeric = {}

MKDOCS_FILE = Path("./mkdocs.yml")
DATA_DIR = Path("data")
PREREQ_FILE = DATA_DIR / "pre.mpk"
NAV_FILE = DATA_DIR / "nav.mpk"


def ensure_data_files():
    """Ensure the data directory and necessary JSON files exist."""
    DATA_DIR.mkdir(exist_ok=True)
    PREREQ_FILE.touch(exist_ok=True)


def mtime(file_path):
    return os.path.getmtime(file_path)


def load_nav_structure():
    """Load the 'nav' section from mkdocs.yml."""
    if os.path.exists(NAV_FILE) and mtime(MKDOCS_FILE) <= mtime(NAV_FILE):
        try:
            with NAV_FILE.open("rb") as f:
                return msgpack.load(f)
        except Exception as e:
            print(f"Error loading cache: {e}", file=sys.stderr)

    try:
        empty_loader = lambda loader, suffix, node: None
        yaml.add_multi_constructor(
            "tag:yaml.org,2002:python/name", empty_loader, Loader=yaml.SafeLoader
        )
        yaml.add_multi_constructor(
            "tag:yaml.org,2002:python/object", empty_loader, Loader=yaml.SafeLoader
        )
        yaml.add_multi_constructor("!ENV", empty_loader, Loader=yaml.SafeLoader)

        with MKDOCS_FILE.open(encoding="utf-8") as f:
            nav_data = yaml.safe_load(f) or {}
    except (FileNotFoundError, yaml.YAMLError) as e:
        print(f"Error loading mkdocs.yml: {e}", file=sys.stderr)
        return {}

    if not isinstance(nav_data, dict) or "nav" not in nav_data:
        print("Warning: 'nav' section missing in mkdocs.yml", file=sys.stderr)
        return {}

    def parse_nav(section):
        """Iteratively parse the 'nav' section of mkdocs.yml."""
        stack = [(section, None)]
        while stack:
            current_section, parent_title = stack.pop()
            if isinstance(current_section, dict):
                for sub_title, sub_path in current_section.items():
                    if isinstance(sub_path, str) and sub_path.endswith(".md"):
                        yield sub_path, sub_title
                    elif isinstance(sub_path, list):
                        stack.append((sub_path, sub_title))
            elif isinstance(current_section, list):
                for item in current_section:
                    stack.append((item, parent_title))

    nav_structure = {}
    for sub_path, metadata in parse_nav(nav_data["nav"]):
        nav_structure[sub_path] = metadata

    try:
        with NAV_FILE.open("wb") as f:
            msgpack.dump(nav_structure, f)
    except IOError as e:
        print(f"Error saving cache: {e}", file=sys.stderr)

    return nav_structure


def parse_front_matter(filepath):
    """Extract front matter from a Markdown file."""
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            return frontmatter.loads(file.read())
    except ValueError:
        return None


def process_article(file_path, nav_structure, id_counter):
    """Process a single article, mapping it to its prerequisites."""
    global id_to_numeric

    rel_path = file_path.relative_to("docs")
    difficulty = rel_path.parts[0] if rel_path.parts else None
    if difficulty not in DIFFICULTY_ORDER or str(rel_path) not in nav_structure:
        return None

    metadata = parse_front_matter(file_path)
    if not metadata or "id" not in metadata:
        return None

    article_id = metadata["id"]
    numeric_id = id_counter[0]
    id_counter[0] += 1
    id_to_numeric[article_id] = numeric_id

    article_data = {
        "id": numeric_id,
        "sid": article_id,
        "path": rel_path,
        "difficulty": DIFFICULTY_ORDER.get(difficulty, -1),
        "prerequisites": metadata.get("prerequisites", []),
        "title": metadata.get("title", nav_structure.get(str(rel_path))),
    }

    return article_data


def process_articles():
    """Process all articles and map each article to its prerequisites."""
    global articles, id_to_numeric
    nav_structure = load_nav_structure()

    exclude_dirs = {"images", "javascripts", "stylesheets", "codes"}

    files_to_process = [
        file_path
        for file_path in Path("docs").rglob("*.md")
        if not any(
            file_path.parts[i] in exclude_dirs for i in range(len(file_path.parts))
        )
    ]

    counter = [0]
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(
            lambda file: process_article(file, nav_structure, counter),
            files_to_process,
        )

    articles = [result for result in results if result]

    updated_articles = []
    for idx, article_data in enumerate(articles):
        if article_data:
            id_to_numeric[article_data["sid"]] = idx

            updated_article = {
                "id": article_data["sid"],
                "path": article_data["path"].as_posix()[:-3],
                "difficulty": article_data["difficulty"],
                "title": article_data["title"],
                "prerequisites": [
                    id_to_numeric.get(prereq_id, -1)
                    for prereq_id in article_data["prerequisites"]
                    if prereq_id in id_to_numeric
                ],
            }
            updated_articles.append(updated_article)

    if updated_articles:
        existing_data = []
        if PREREQ_FILE.exists() and PREREQ_FILE.stat().st_size > 0:
            with open(PREREQ_FILE, "rb") as f:
                existing_data = msgpack.load(f)

        if existing_data != updated_articles:
            with open(PREREQ_FILE, "wb") as f:
                msgpack.dump(updated_articles, f)


def on_pre_build(config, **kwargs):
    if not os.path.exists(PREREQ_FILE):
        ensure_data_files()

    if mtime(PREREQ_FILE) < mtime(MKDOCS_FILE):
        process_articles()


def on_page_context(context, page, config, **kwargs):
    """Add only direct prerequisites data to page context."""
    prereqs = []
    global articles

    if not articles:
        process_articles()

    page_path = Path(page.file.src_path)
    difficulty = DIFFICULTY_ORDER.get(page_path.parts[0] if page_path.parts else "", -1)

    prerequisites_list = page.meta.get("prerequisites", [])
    seen_prerequisites = set()

    prerequisites_set = set(prerequisites_list)

    md_len = len(".md")

    prereqs = [
        {
            "path": f"{article["path"].as_posix()[:-md_len]}/",
            "difficulty": article["difficulty"],
            "title": article["title"],
        }
        for prerequisite in prerequisites_set
        if (numeric_prerequisite_id := id_to_numeric.get(prerequisite, -1)) >= 0
        and (article := articles[numeric_prerequisite_id])
        and numeric_prerequisite_id not in seen_prerequisites
        and not seen_prerequisites.add(numeric_prerequisite_id)
    ]

    prereqs.sort(key=lambda prereq: (prereq["difficulty"], prereq["title"]))
    context["prerequisites_data"] = prereqs
    context["difficulty"] = difficulty

    return context
