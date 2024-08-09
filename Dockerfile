FROM python:latest

WORKDIR /docs

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["mkdocs", "serve"]