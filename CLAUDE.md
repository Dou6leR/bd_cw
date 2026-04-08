# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structure

Coursework project with two top-level directories:
- `backend/` — FastAPI app (Python >=3.14, managed with `uv`). Currently scaffolding only.
- `frontend/` — empty.

## Backend

Layout:
- `main.py` — FastAPI app entrypoint with CORS middleware and a `lifespan` context manager (intended for startup/shutdown of DB connections). Run via `python main.py` (uses uvicorn programmatically with host/port from settings).
- `core/config.py` — `pydantic-settings` based config. Loads from `.env`, env prefix `APP_CONFIG__`, nested delimiter `__` (e.g., `APP_CONFIG__RUN__PORT=8000`). Import the singleton `settings`.
- `core/models/`, `core/schemas/` — empty; intended for SQLAlchemy ORM models and Pydantic schemas respectively.
- `api/v1/` — versioned API routers (empty). New endpoints go here and should be wired into `main.py` via `app.include_router`.

Stack: FastAPI, SQLAlchemy 2.x, Alembic (migrations), pydantic-settings, uvicorn. No DB session/engine wired up yet.

### Commands (run from `backend/`)

- Install deps: `uv sync`
- Run dev server: `uv run python main.py`
- Lint/format: `uv run ruff check .` / `uv run ruff format .`
- Alembic migrations (once configured): `uv run alembic revision --autogenerate -m "msg"` / `uv run alembic upgrade head`

No tests exist yet. `test_main.http` is a JetBrains HTTP-client scratch file, not a test suite.
