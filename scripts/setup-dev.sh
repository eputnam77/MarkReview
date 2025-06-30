#!/usr/bin/env bash
set -euo pipefail

# Install Python dependencies with Poetry
pip install poetry
poetry install --with dev

# Install Node dependencies
if command -v pnpm >/dev/null 2>&1; then
    pnpm install --frozen-lockfile
else
    corepack pnpm install --frozen-lockfile
fi

# Display the dev gate commands
cat <<'EOT'
To run the development checks locally execute:

ruff check src tests
black --check src tests
mypy --strict src
bandit -r src -lll --skip B101
pytest -q --cov=src --cov-fail-under=70
EOT

