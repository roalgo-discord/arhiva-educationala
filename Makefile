MKDOCS = mkdocs
PYTHON = python3
VENV_DIR = .venv
PORT = 8000
CONFIG_FILE = mkdocs.yml
OUTPUT_DIR = site
IMAGE_NAME = mkdocs-arhiva
CONTAINER_NAME = docker-arhiva
DOCKER ?= 0

.DEFAULT_GOAL := help

# Targets
.PHONY: help build serve clean install venv docker-build docker-serve docker-clean

help:
	@echo "Usage:"
	@echo "  make install         - Install dependencies"
	@echo "  make venv            - Set up virtual environment"
	@echo "  make build           - Build the MkDocs site"
	@echo "  make serve           - Serve the site locally"
	@echo "  make clean           - Clean the site directory"
	@echo "  make docker-build    - Build Docker image"
	@echo "  make docker-serve    - Serve using Docker"
	@echo "  make docker-clean    - Clean Docker resources"

venv:
	@if [ ! -d "$(VENV_DIR)" ]; then \
		echo "Creating virtual environment..."; \
		$(PYTHON) -m venv $(VENV_DIR); \
		. $(VENV_DIR)/bin/activate && \
		pip install --upgrade pip setuptools; \
	else \
		echo "Virtual environment already exists."; \
	fi

install: venv
	@echo "Installing dependencies..."
	@. $(VENV_DIR)/bin/activate && \
	pip install -r requirements.txt

build:
ifeq ($(DOCKER),1)
	@echo "Building MkDocs site using Docker..."
	docker run --rm -v $(PWD):/docs $(IMAGE_NAME) $(MKDOCS) build -f $(CONFIG_FILE) -d $(OUTPUT_DIR)
else
	@echo "Building MkDocs site locally..."
	@. $(VENV_DIR)/bin/activate && \
	$(MKDOCS) build -f $(CONFIG_FILE) -d $(OUTPUT_DIR)
endif

serve:
ifeq ($(DOCKER),1)
	@echo "Serving MkDocs using Docker..."
	docker run --name $(CONTAINER_NAME) --rm -p $(PORT):8000 -v $(PWD):/docs $(IMAGE_NAME) $(MKDOCS) serve -a 0.0.0.0:8000
else
	@echo "Serving MkDocs locally..."
	@. $(VENV_DIR)/bin/activate && \
	$(MKDOCS) serve -a 0.0.0.0:$(PORT) -f $(CONFIG_FILE)
endif

clean:
ifeq ($(DOCKER),1)
	@echo "Cleaning Docker container..."
	-docker rm -f $(CONTAINER_NAME)
else
	@echo "Cleaning up $(OUTPUT_DIR)..."
	@rm -rf $(OUTPUT_DIR)
endif

docker-build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

docker-serve:
	@echo "Serving MkDocs using Docker..."
	docker run --name $(CONTAINER_NAME) --rm -p $(PORT):$(PORT) -v $(PWD):/docs $(IMAGE_NAME) $(MKDOCS) serve -a 0.0.0.0:$(PORT)

docker-clean:
	@echo "Cleaning up Docker resources..."
	-docker rm -f $(CONTAINER_NAME)
	-docker rmi -f $(IMAGE_NAME)
