# ADR 0006: Remove Legacy Packages and Rename Python Module

## Context

Earlier ADRs introduced a monorepo with separate packages for a CLI and static site plugins. The PRD section 8 now describes a single library located at the repository root under `src/`. `TASKS.md` further instructs us to delete the old `markreview-cli`, `mkdocs-markreview` and `docusaurus-plugin-trackchanges` packages and to consolidate the Python plugin under a module named `mkdocs_markreview`.

## Decision

- Retire the `packages/markreview-cli`, `packages/mkdocs-markreview`, and `packages/docusaurus-plugin-trackchanges` directories.
- Source code for both the runtime and MkDocs plugin lives in `src/` and `mkdocs_markreview/` respectively.
- The Python plugin package is renamed from `markreview` to `mkdocs_markreview` to match naming conventions in `AGENTS.md` and to avoid import clashes.

## Consequences

- Repository maintenance focuses on a single library, reducing build complexity.
- Future scaffolding and tests will target `src/` and `mkdocs_markreview/` only.
- Example projects and documentation will be updated to reference the consolidated package.
