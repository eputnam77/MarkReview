# ADR 0001: Monorepo Structure and Tooling

## Context

MarkReview is distributed as a set of packages:

- `mkdocs-markreview` – a Python package providing the MkDocs plugin.
- `docusaurus-plugin-trackchanges` – a Node package for Docusaurus.
- `markreview-cli` – a Node command line utility to accept, reject or strip CriticMarkup.

The repository uses `pnpm` workspaces for JavaScript dependencies while the Python plugin maintains its own `pyproject.toml`. Continuous integration is configured via GitHub Actions (`.github/workflows/ci.yml` and `agents.yml`).

## Decision

We keep all deliverables in a single repository managed as a monorepo. JavaScript packages live under `packages/` and share a common lockfile. The Python plugin resides in `packages/mkdocs-markreview` with its own build metadata. Documentation is stored under `docs/` and MkDocs drives the site build. Tests are located alongside each package with an additional `tests/` directory for integration tests.

## Consequences

- Development across Node and Python components happens in one place which simplifies version coordination.
- CI jobs install both Node and Python toolchains to run linting and tests.
- No changes are required to the current folder layout as it already matches the structure defined above and does not conflict with `AGENTS.md`.
