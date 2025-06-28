# ADR 0001: Monorepo Structure and Tooling

## Context

MarkReview is distributed as a set of packages:

- `mkdocs-markreview` – a Python package providing the MkDocs plugin.  The source
  directory is `mkdocs_markreview` to align with `AGENTS.md`.
- `docusaurus-plugin-trackchanges` – a Node package for Docusaurus.
- `markreview` – a new TypeScript package containing the reusable runtime logic,
  CSS and CLI.  It replaces the older `markreview-cli` package which will be
  removed after migration.

The repository uses `pnpm` workspaces for JavaScript dependencies while the Python
plugin maintains its own `pyproject.toml`. Continuous integration is configured via
GitHub Actions (`.github/workflows/ci.yml` and `agents.yml`).

## Decision

We keep all deliverables in a single repository managed as a monorepo. JavaScript
packages live under `packages/` and share a common lockfile. The Python plugin
resides in `packages/mkdocs-markreview` with its source code in
`mkdocs_markreview` and its own build metadata. A new shared library
`packages/markreview` hosts the runtime assets and CLI used by both plugins.
Documentation is stored under `docs/` and MkDocs drives the site build. Tests are
located alongside each package with an additional `tests/` directory for
integration tests.

## Consequences

- Development across Node and Python components happens in one place which simplifies version coordination.
- CI jobs install both Node and Python toolchains to run linting and tests.
- The new `markreview` package centralises assets and CLI. The older
  `markreview-cli` package will be deleted once migration completes.
- The Python plugin directory is renamed to `mkdocs_markreview` so tests and CI
  follow the paths mandated by `AGENTS.md`.
- Example projects will be organised under `examples/basic-html`,
  `examples/tiptap-editor`, `examples/toast-ui-editor` and
  `examples/docusaurus-demo` as noted in `TASKS.md`.
