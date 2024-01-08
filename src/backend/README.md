# Generative-AI-Q-A-System - Backend

## Backend requirements
- Docker
- Docker Compose
- Poetry for Python package and environment management.

## Local development
By default, the dependencies are managed with [Poetry](https://python-poetry.org/), go there and install it.

From `src/backend/` you can install all the dependencies with:
```console
$ poetry install
```
Then you can start a shell session with the new environment with:

```console
$ poetry shell
```
Next, open your editor at `src/backend/app/` (instead of the project root: `./`), so that you see an `./app/` directory with your code inside. That way, your editor will be able to find all the imports, etc. Make sure your editor uses the environment you just created with Poetry.

## Manual run backend
```console
$ uvicorn main:app --reload --port 8000 
```