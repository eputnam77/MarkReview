# ADR 0010: Move to a Node-Only Toolchain

## Context

Earlier ADRs and the initial repository layout mixed Python and Node.js tooling.  The current codebase, however, only contains a TypeScript library. The Python workflow added unnecessary complexity.

## Decision

- Drop Python specific dependencies and tests from the core package.
- Consolidate build tooling around Node.js 18+ using pnpm.
- Use **tsup** to generate ESM and CJS bundles with declaration files.
- Run ESLint, Prettier, `tsc --noEmit`, `npm audit` and Vitest in CI as defined in `AGENTS.md`.
- Documentation remains under `docs/` with ADRs stored in `docs/adr/`.

## Consequences

- Continuous integration is faster and simpler.
- Future features will be implemented in TypeScript with Vitest for unit tests.
- Python remains only for docs generation via MkDocs if needed.
