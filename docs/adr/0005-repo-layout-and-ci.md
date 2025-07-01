# ADR 0005: Root Source Layout and CI Pipeline

## Context

PRD section 8 outlines a simplified repository where the runtime library lives at the project root under `src/`. The previous decision (ADR 0003) proposed a separate `packages/markreview` workspace. Planner tasks now prioritise a single package and the removal of legacy folders (`markreview-cli`, `docusaurus-plugin-trackchanges`, `mkdocs-markreview`).

## Decision

- Adopt the root `src/` layout with subfolders `core/`, `ui/`, `adapters/`, `keymap/`, `diff-headless/` and `styles.css`.
- Keep example editors in `examples/` and documentation under `docs/`.
- Introduce a `storybook/` directory for component demos.
- Replace previous CI with a Node-only workflow running the dev gate commands defined in `AGENTS.md` (ESLint, Prettier, `tsc --noEmit`, Vitest and `npm audit`).
- A routing workflow (`agents.yml`) invokes the correct Codex agent after each push.

## Consequences

- All build outputs and tooling operate from a single package which matches the PRD and simplifies publishing.
- Old packages were removed once the JavaScript library replaced them. No Python tests remain in the repository.
- GitHub Actions enforce the quality gates described in `AGENTS.md`, providing consistent checks across languages.
