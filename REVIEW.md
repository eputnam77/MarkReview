# Code Review — MarkReview

## Overview
The repository implements a TypeScript package that adds Word-style review tools to ProseMirror editors. The `src/` folder holds modular code for parsing CriticMarkup, tracking format changes, rendering UI widgets and providing adapter hooks. Automated tests use Vitest and the project ships with a CI pipeline (GitHub Actions) that runs linting, type checks and coverage.

## PRD Coverage
- Functional requirements F‑1 through F‑12 are represented in code. Examples include:
  - `parseCriticMarkup` for F‑1【F:src/core/criticParser.ts†L1-L42】
  - `trackFormatChanges` for F‑2【F:src/core/formatTracker.ts†L1-L22】
  - `applyChangeBars` for F‑4【F:src/ui/changeBars.ts†L1-L42】
  - `setupToolbar` for F‑5【F:src/ui/toolbar.ts†L1-L14】
  - `attachPopupControls` for F‑6【F:src/ui/popupWidget.ts†L1-L36】
  - `buildReviewPanel` for F‑7【F:src/ui/reviewPanel.ts†L1-L32】
  - `CommentThread` for F‑8 and F‑9【F:src/core/comments.ts†L1-L39】【F:src/api/user.ts†L1-L18】
  - `persistMarks` for F‑10【F:src/core/persistence.ts†L11-L52】
  - `bindAction`/`loadKeymap` for F‑11【F:src/keymap/index.ts†L1-L15】
  - `attach` and `diffDoc` for F‑12【F:src/index.ts†L1-L37】【F:src/diff-headless/index.ts†L1-L22】
- Non‑functional items such as peer dependencies and CI scripts are covered in `package.json` and `.github/workflows/ci.yml`【F:package.json†L18-L32】【F:.github/workflows/ci.yml†L20-L28】.
- Documentation and locale packs satisfy F‑14【F:docs/accessibility.md†L1-L8】【F:docs/locales/en.json†L1-L5】.

## Integration Risks
- `cleanupPythonSources` and other FS helpers use Node APIs, which may fail in browser environments.
- The persistence functions operate on generic `PMNode` structures but only test plain text, so integration with real ProseMirror documents could reveal issues.
- The placeholder `startDiffServer` and collaboration stubs may mislead developers expecting network features.

## Performance Considerations
- `diffDoc`, `trackFormatChanges` and `applyChangeBars` run linear scans; they should handle moderately large documents efficiently.
- Scripts under `scripts/performance-check.cjs` evaluate bundle size and DOM scan times but the CI job does not enforce strict thresholds.
- Using synchronous FS calls (`fs.rmSync`) may block the event loop during build steps.

## Maintainability Notes
- The code base is well structured with small, documented modules.
- Extensive unit tests exist and coverage is high, although coverage for some modules (e.g. UI behaviours) is limited.
- TODO comments in the API server and collaboration stubs indicate incomplete features; consider tracking them as issues.

## Mandatory Fixes
1. Remove Node‑specific functions from browser bundles or clearly isolate them to avoid runtime errors when used in the browser.
2. Expand tests for `persistMarks` and adapter modules to ensure ProseMirror documents integrate as expected.
3. Enforce the performance gate (bundle ≤10 kB JS / 5 kB CSS and DOM scan <5 ms) in CI as required by F‑13.

## Optional Suggestions
- Replace synchronous `fs` calls with asynchronous versions in build scripts.
- Document the placeholder nature of `startDiffServer` and collaboration hooks to set expectations.
- Add more thorough E2E tests covering adapter integration with example editors.

## Next Steps
Label this PR with `ready-for:releasebot` to continue the workflow.
