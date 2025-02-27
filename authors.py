import yaml
import os
import sys
import msgpack
from pathlib import Path

AUTHORS_FILE = Path("authors.yml")
DATA_DIR = Path("data")
AUTHORS_MPK = DATA_DIR / "authors.mpk"


def mtime(file_path):
    """Returns the last modification time of the file."""
    return os.path.getmtime(file_path)


def ensure_data_files():
    """Ensure that the data directory and cache file exist before proceeding."""
    if not DATA_DIR.exists():
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {DATA_DIR}")

    # Ensure the cache file exists but is empty before writing to it
    if not AUTHORS_MPK.exists():
        try:
            AUTHORS_MPK.touch(exist_ok=True)
            print(f"Created empty cache file: {AUTHORS_MPK}")
        except Exception as e:
            print(f"Error creating cache file: {e}", file=sys.stderr)


def is_valid_authors_data(data):
    """Check if authors data is valid (not empty and structured correctly)."""
    return isinstance(data, dict) and bool(data)


def save_authors_to_cache(authors_data):
    """Save authors data to the cache if it's valid."""
    if is_valid_authors_data(authors_data):
        try:
            with AUTHORS_MPK.open("wb") as f:
                msgpack.dump(authors_data, f)
            print("Authors data saved to cache.")
        except Exception as e:
            print(f"Error saving authors cache: {e}", file=sys.stderr)
    else:
        print("Invalid data, not saving to cache.", file=sys.stderr)


def clear_cache_file():
    """Clear the cache file if it's invalid or corrupted."""
    try:
        AUTHORS_MPK.unlink()  # Remove the corrupted cache file
        print("Cleared invalid cache file.")
    except Exception as e:
        print(f"Error clearing cache file: {e}", file=sys.stderr)


def load_authors():
    """Load authors from authors.yml and store them in authors.mpk."""
    ensure_data_files()

    # If cache is newer than authors.yml, try to load from cache
    if AUTHORS_MPK.exists() and os.path.getsize(AUTHORS_MPK) > 0:
        try:
            with AUTHORS_MPK.open("rb") as f:
                # Attempt to load from cache
                print("Attempting to load from cache...")
                authors_data = msgpack.load(f)
                if authors_data:  # Ensure the data is not empty
                    print("Cache loaded successfully.")
                    return authors_data
                else:
                    print("Cache is empty, reloading authors.", file=sys.stderr)
                    clear_cache_file()
        except Exception as e:
            print(f"Error loading authors cache: {e}", file=sys.stderr)
            # Fall back to loading from authors.yml if cache is invalid
            clear_cache_file()

    # Load from the YAML file if cache is invalid or missing
    print("Loading authors from authors.yml...")
    try:
        with AUTHORS_FILE.open(encoding="utf-8") as f:
            authors_data = yaml.safe_load(f) or {}
            if not authors_data:
                print("No authors data found in authors.yml!", file=sys.stderr)
                return {}
    except (FileNotFoundError, yaml.YAMLError) as e:
        print(f"Error loading authors.yml: {e}", file=sys.stderr)
        return {}

    # Save data to cache for future use
    save_authors_to_cache(authors_data)

    return authors_data


def on_pre_build(config, **kwargs):
    """Ensure data files and process authors before build."""
    if (
        not AUTHORS_MPK.exists()
        or os.path.getsize(AUTHORS_MPK) == 0
        or mtime(AUTHORS_FILE) > mtime(AUTHORS_MPK)
    ):
        load_authors()


def on_config(config):
    """Load authors and add them to extra: authors: in MkDocs config."""
    config.extra["authors"] = load_authors()
    return config
