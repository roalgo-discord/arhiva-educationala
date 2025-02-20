import json
import os
import yaml
import hashlib
from collections import defaultdict, deque

DIFFICULTY_ORDER = {"cppintro": 0, "usor": 1, "mediu": 2, "dificil": 3, "avansat": 4}
FILE_HASHES = {}
PREREQ_HASHES = {}
articles = {}


def load_nav_structure():
    """Load the 'nav' section from mkdocs.yml and populate file_to_title."""
    try:
        with open("mkdocs.yml", "r", encoding="utf-8") as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("Error: mkdocs.yml not found.")
        return {}

    nav_lines = []
    in_nav_section = False

    for line in lines:
        if line.strip().startswith("nav:"):
            in_nav_section = True
            nav_lines.append(line.strip())
        elif in_nav_section:
            if line.strip() == "" or not line.startswith(" "):
                break
            elif line.strip().startswith("#"):
                continue

            nav_lines.append(line.strip())

    try:
        nav_data = yaml.safe_load("\n".join(nav_lines))
    except yaml.YAMLError:
        print("Error: Unable to parse mkdocs.yml.")
        return {}

    return {
        list(item.values())[0]: list(item.keys())[0]
        for item in nav_data["nav"]
        if isinstance(item, dict)
        and list(item.values())[0]
        and list(item.values())[0].endswith(".md")
    }


def calculate_file_hash(filepath):
    """Calculate the hash of a file to detect changes, and return the first 16 characters."""
    hash_sha256 = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            hash_sha256.update(chunk)
    return hash_sha256.hexdigest()[:16]


def calculate_prerequisite_hash(prerequisites):
    """Calculate a hash for the prerequisites to detect changes, and return the first 16 characters."""
    hash_sha256 = hashlib.sha256()
    for prereq in prerequisites:
        hash_sha256.update(prereq.encode("utf-8"))
    return hash_sha256.hexdigest()[:16]


def parse_front_matter(filepath):
    """Extract front matter from a Markdown file."""
    with open(filepath, "r", encoding="utf-8") as file:
        lines = file.readlines()

    try:
        start = lines.index("---\n") + 1
        end = lines.index("---\n", start)
        return yaml.safe_load("".join(lines[start:end]))
    except ValueError:
        return None


def load_previous_hashes():
    """Load file and prerequisite hashes if available."""
    try:
        with open("data/hashes.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def save_file_hashes():
    """Save current file and prerequisite hashes to a cache."""
    with open("data/hashes.json", "w", encoding="utf-8") as f:
        json.dump(FILE_HASHES, f, ensure_ascii=False)


def topological_sort():
    """Perform a topological sort based on article dependencies."""
    graph = defaultdict(set)
    in_degree = defaultdict(int)

    for article_id, data in articles.items():
        for prereq in data["prerequisites"]:
            graph[prereq].add(article_id)
            in_degree[article_id] += 1

    queue = deque(
        sorted(
            [a for a in articles if in_degree[a] == 0],
            key=lambda x: DIFFICULTY_ORDER.get(articles[x]["difficulty"], -1),
        )
    )

    sorted_articles = []
    while queue:
        current = queue.popleft()
        sorted_articles.append(current)
        for dependent in graph[current]:
            in_degree[dependent] -= 1
            if in_degree[dependent] == 0:
                queue.append(dependent)

    return sorted_articles


def update_prerequisites_json():
    """Update prerequisites JSON efficiently."""
    prerequisites_data = {}
    sorted_articles = topological_sort()

    for article_id, data in articles.items():
        sorted_prereqs = [pr for pr in sorted_articles if pr in data["prerequisites"]]
        if sorted_prereqs:
            prerequisites_data[article_id] = [
                {
                    "id": pr,
                    "path": articles[pr]["path"],
                    "difficulty": articles[pr]["difficulty"],
                    "title": articles[pr]["title"],
                }
                for pr in sorted_prereqs
            ]

    if prerequisites_data:
        with open("data/prerequisites.json", "w", encoding="utf-8") as json_file:
            json.dump(prerequisites_data, json_file, ensure_ascii=False)


def process_articles():
    """Process all articles, updating prerequisites and file hashes."""
    global FILE_HASHES, PREREQ_HASHES
    FILE_HASHES = load_previous_hashes()

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
                        file_hash = calculate_file_hash(filepath)

                        metadata = parse_front_matter(filepath)
                        if metadata and "id" in metadata:
                            prereq_hash = calculate_prerequisite_hash(
                                metadata.get("prerequisites", [])
                            )
                            current_hash = file_hash + prereq_hash

                            if FILE_HASHES.get(filepath) != current_hash:
                                articles[metadata["id"]] = {
                                    "path": filepath,
                                    "difficulty": difficulty,
                                    "prerequisites": metadata.get("prerequisites", []),
                                    "title": metadata.get(
                                        "title", nav_structure[file_path]
                                    ),
                                }

                                FILE_HASHES[filepath] = current_hash

    update_prerequisites_json()
    save_file_hashes()


def on_pre_build(config, **kwargs):
    process_articles()


def on_page_context(context, page, config, **kwargs):
    """Add prerequisites data to page context."""
    prerequisites_data = []
    global PREREQ_HASHES

    if "prerequisites" in page.meta:
        prerequisites_list = page.meta["prerequisites"]

        if not PREREQ_HASHES:
            with open("data/prerequisites.json", "r", encoding="utf-8") as f:
                PREREQ_HASHES = json.load(f)

        seen_prerequisites = set()
        for prerequisite_id in prerequisites_list:
            if prerequisite_id in PREREQ_HASHES:
                for prerequisite in PREREQ_HASHES[prerequisite_id]:
                    if prerequisite["id"] not in seen_prerequisites:
                        prerequisite_copy = prerequisite.copy()

                        difficulty_value = DIFFICULTY_ORDER.get(
                            prerequisite_copy["difficulty"], -1
                        )
                        prerequisite_copy["difficulty"] = difficulty_value

                        prerequisites_data.append(prerequisite_copy)
                        seen_prerequisites.add(prerequisite["id"])

        context["prerequisites_data"] = prerequisites_data

    return context
