# pull official base image
FROM python:3.11 AS builder

# set work directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE=main.settings \
    LC_ALL=es_ES.UTF-8

# update apt and install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    locales locales-all gcc libffi-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock ./
COPY api/pyproject.toml api/pyproject.toml
COPY api/README.md api/README.md

RUN uv sync --project api --frozen

COPY api /app/api

WORKDIR /app/api

EXPOSE 8000

CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]