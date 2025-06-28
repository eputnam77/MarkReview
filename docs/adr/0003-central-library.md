# ADR 0003: Central TypeScript Library and Folder Restructure

## Context

The updated PRD (version May 2024) introduces a unified **markreview** library.
It houses the DOM scanning logic, change‑bar styles, a CLI and TypeScript
definitions.  Planner tasks create issues to migrate existing assets and
consolidate tooling.  Currently the repository stores JavaScript under
`docusaurus-plugin-trackchanges` and `markreview-cli` while the MkDocs plugin
keeps a separate copy of the runtime assets.

The Python plugin lives in `packages/mkdocs-markreview/markreview`, which
conflicts with the `AGENTS.md` expectation of a `mkdocs_markreview` source
folder.

## Decision

- Add a new workspace package `packages/markreview` following the folder layout
  from the PRD (src/, dist/, CLI, CSS and type definitions).
- Move the JavaScript and CSS assets from both existing plugins into this
  package.
- Port the Node CLI code into `packages/markreview` and remove the old
  `markreview-cli` package after migration.
- Rename the Python source directory to `mkdocs_markreview` so that CI and test
  paths align with `AGENTS.md`.
- Plugins (`mkdocs-markreview` and `docusaurus-plugin-trackchanges`) will load
  compiled assets from the new package.

## Consequences

- A single build step (e.g. `pnpm build`) produces distributable JS/CSS for all
  consumers.
- The repository layout matches the PRD and ensures future features—such as the
  comment system and export utilities—share one implementation.
- Existing imports in the Python tests and plugins must be updated to use the new
  `mkdocs_markreview` package name.
- Example projects and documentation will reference the unified package.
