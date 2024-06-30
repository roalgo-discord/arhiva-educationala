FROM mcr.microsoft.com/devcontainers/python:3

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8000 
CMD [ "mkdocs", "serve" ]
