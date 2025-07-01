# Code Review

## Overview
MarkReview is a TypeScript library adding CriticMarkup style review tools to ProseMirror based editors. The repository contains typed core modules, minimal UI widgets and example integrations. Tests run with Vitest and coverage gates are enforced through GitHub Actions.

## Integration Risks
- CSS variables such as `--markreview-add-color` are defined globally in `styles.css` and may clash with host applications.
- The server API stub `startDiffServer` currently returns a fixed string. Adapters relying on real network behaviour may break when integrated.
- `bindAction` mutates `DEFAULT_KEYS` in place which could lead to shared state across modules if multiple editors run in the same page.
- IDs for comments use `Date.now()` which might collide in fast sequences and lacks UUID style uniqueness.

## Performance
- Functions like `parseCriticMarkup` and `trackFormatChanges` use simple loops and regexes. They should scale on typical documents but the regex in `persistMarks` could be costly on large inputs.
- `checkBundleSize` and `scanDomBenchmark` exist but are not used in CI, so bundle limits and DOM scan targets are unenforced.

## Maintainability
- The codebase is fully typed and passes ESLint, Prettier and `tsc` checks.
- Tests cover all modules with overall coverage around 95%.
- Several modules are placeholders (e.g. collaboration hooks and server API). Clear TODO comments would help future contributors.

## PRD Coverage
- `docs/VERIFICATION_REPORT.md` maps functional requirements F‑1 through F‑14 with references to the code. Key lines include the CriticMarkup parser and toolbar persistence【F:docs/VERIFICATION_REPORT.md†L36-L54】.
- Tasks such as the CriticMarkup parser specification【F:docs/TASKS.md†L62-L67】 and the change‑bar module【F:docs/TASKS.md†L89-L95】 match the PRD.
- All mandatory features appear at least partially implemented, though bundle-size validation and usability metrics remain open as noted in the report.

## Mandatory Fixes
1. Implement real document persistence in `persistMarks` to operate on ProseMirror structures.
2. Enforce performance checks (`checkBundleSize`, `scanDomBenchmark`) in CI as required by F‑13.
3. Extend UI modules (`toolbar`, `reviewPanel`) to cover filtering, search and preferences as per PRD.

## Optional Enhancements
- Switch comment ID generation to a UUID library for robustness.
- Convert CSS variables to use a prefixed namespace to avoid collisions.
- Add explicit TODO markers in stub modules (`collaboration`, `server`) for clarity.

All tests and type checks pass, giving confidence in the current code quality.
