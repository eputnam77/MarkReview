# Code Review — MarkReview

## Overview

MarkReview is a TypeScript package that adds Word-style review tools to any ProseMirror editor. Source files in `src/` implement parsing, persistence and UI helpers while `src/node` contains Node-only utilities. Documentation lives in `docs/` and example adapters in `src/adapters`. The project builds with **tsup** and tests run through **Vitest**. Recent coverage sits at **87.59 %**【dbc00a†L1-L5】.

## PRD Coverage

Every mandatory requirement from `.dev/PRD.md` is present in the codebase:

- **F‑1** CriticMarkup parsing via `parseCriticMarkup`【F:src/core/criticParser.ts†L1-L42】
- **F‑2** Format-change tracking in `trackFormatChanges`【F:src/core/formatTracker.ts†L1-L22】
- **F‑3** WCAG-AA palette variables in `styles.css`【F:src/styles.css†L1-L10】
- **F‑4** Margin bars computed by `applyChangeBars`【F:src/ui/changeBars.ts†L1-L34】
- **F‑5** Toolbar state stored with `setupToolbar`【F:src/ui/toolbar.ts†L1-L15】
- **F‑6** Inline accept/reject/comment in `attachPopupControls`【F:src/ui/popupWidget.ts†L1-L34】
- **F‑7** Review panel filtering and stats via `buildReviewPanel` and preferences in `savePanelPreferences`【F:src/ui/reviewPanel.ts†L15-L74】
- **F‑8/9** Threaded comments and user hooks【F:src/core/comments.ts†L1-L54】【F:src/api/user.ts†L1-L18】
- **F‑10** Document persistence handled by `persistMarks`【F:src/core/persistence.ts†L1-L49】
- **F‑11** Configurable keymap utilities【F:src/keymap/index.ts†L1-L15】
- **F‑12** Public attach API and headless diff export【F:src/index.ts†L1-L37】【F:src/diff-headless/index.ts†L1-L22】
- **F‑13** Performance gate script checking bundle size and DOM scan time【F:scripts/performance-check.cjs†L1-L33】
- **F‑14** Accessibility notes and locale packs in docs【F:docs/accessibility.md†L1-L8】【F:docs/locales/en.json†L1-L5】

## Integration Risks

- Browser builds must exclude `src/node` helpers; the README explains the `browser` field and empty module【F:README.md†L26-L36】.
- `startDiffServer` and `enableRealtimeCollaboration` are stubs that return static values and perform no I/O【F:src/api/server.ts†L1-L14】【F:src/collaboration/index.ts†L1-L11】.
- Persistence functions operate on simple ProseMirror schemas and may miss edge cases in complex documents.
- Global CSS variables could clash with host styles.
- Node scripts rely on synchronous `fs` calls which could block builds on large directories【F:src/node/cleanupPythonSources.ts†L7-L15】.

## Performance Notes

- Diff and format tracking perform linear scans of input strings.
- `scripts/performance-check.cjs` verifies gzip bundle size (<10 kB JS, <5 kB CSS) and DOM scan time under 5 ms【F:scripts/performance-check.cjs†L20-L29】. CI runs `pnpm run build` before executing this script【F:.github/workflows/ci.yml†L17-L28】.
- `persistMarks` uses an iterative stack to update deep ProseMirror nodes and may still be heavy on very large docs.

## Maintainability

- Modules are short and well typed; placeholder declarations describe the generated types directory【F:types/index.d.ts†L1-L7】.
- CI enforces linting, formatting, type checks and coverage on every push【F:.github/workflows/ci.yml†L17-L28】.
- Docs and README highlight the placeholder server and collaboration helpers, reducing confusion when integrating【F:docs/api/server.md†L1-L11】【F:docs/api/collaboration.md†L1-L8】.
- `validateUsabilityMetrics` checks that user tests meet success criteria【F:src/core/usabilityMetrics.ts†L1-L23】.

## Mandatory Fixes

1. Keep README and docs emphasising that `startDiffServer` and `enableRealtimeCollaboration` are only stubs.
2. Confirm bundlers respect the `browser` field so `src/node` stays out of browser bundles.
3. Monitor `persistMarks` on large and custom ProseMirror schemas to avoid unexpected behaviour.

## Optional Enhancements

- Convert synchronous file-system calls in scripts to asynchronous versions.
- Expand integration tests for the example adapters in `examples/`.
- Document the new usability metrics helper and consider automated reporting.

When these items are resolved, apply the label `ready-for:releasebot`.
