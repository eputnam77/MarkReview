# Code Review — MarkReview

## Overview

MarkReview delivers change tracking and review tools for ProseMirror editors. Source files under `src/` implement parsing, persistence and UI helpers while `src/node` houses build utilities. Documentation lives in `docs/` and example adapters in `src/adapters`. The codebase builds with `tsup` and tests run through Vitest. Coverage currently sits around 88%【fad66b†L1-L21】.

## PRD Coverage

All mandatory requirements from `.dev/PRD.md` are reflected in the codebase:
- F‑1 CriticMarkup parsing via `parseCriticMarkup`【F:src/core/criticParser.ts†L1-L42】
- F‑2 Format change tracking with `trackFormatChanges`【F:src/core/formatTracker.ts†L1-L22】
- F‑3 Accessible palette variables defined in `styles.css`【F:src/styles.css†L1-L10】
- F‑4 Margin bars computed by `applyChangeBars`【F:src/ui/changeBars.ts†L1-L34】
- F‑5 Toolbar state saved by `setupToolbar`【F:src/ui/toolbar.ts†L1-L14】
- F‑6 Inline actions handled in `attachPopupControls`【F:src/ui/popupWidget.ts†L1-L34】
- F‑7 Review panel logic in `buildReviewPanel`【F:src/ui/reviewPanel.ts†L1-L31】
- F‑8/9 Threaded comments and user hooks【F:src/core/comments.ts†L1-L39】【F:src/api/user.ts†L1-L18】
- F‑10 Document persistence via `persistMarks`【F:src/core/persistence.ts†L11-L52】
- F‑11 Configurable keymap utilities【F:src/keymap/index.ts†L1-L15】
- F‑12 Editor attachment and headless diff functions【F:src/index.ts†L1-L37】【F:src/diff-headless/index.ts†L1-L22】
- F‑13 Performance gate executed in `scripts/performance-check.cjs`【F:scripts/performance-check.cjs†L1-L27】
- F‑14 Accessibility docs and locale packs【F:docs/accessibility.md†L1-L8】【F:docs/locales/en.json†L1-L5】

## Integration Risks

- Node-specific helpers under `src/node` must be excluded from browser bundles. README calls this out explicitly【F:README.md†L26-L36】.
- Stub APIs like `startDiffServer` and `enableRealtimeCollaboration` return static values and perform no I/O【F:src/api/server.ts†L1-L14】【F:src/collaboration/index.ts†L1-L12】. Consumers expecting real networking could be misled.
- Persistence functions only exercise simple documents; real ProseMirror schemas may expose edge cases.

## Performance Considerations

- Diff and format tracking utilities perform linear scans and should scale linearly with document size.
- `scripts/performance-check.cjs` enforces bundle size (<10 kB JS, <5 kB CSS) and DOM scan time <5 ms【F:scripts/performance-check.cjs†L18-L27】.
- Build scripts rely on synchronous `fs` operations which can block the event loop.

## Maintainability Notes

- Source modules are short and well typed. Types are generated during build and placeholder declarations explain how the folder is replaced【F:types/index.d.ts†L1-L7】.
- Test coverage is high and CI runs linting, type checks and coverage on every push【F:.github/workflows/ci.yml†L7-L29】.
- Documentation clarifies stub functionality and bundler guidance, reducing confusion for integrators【F:docs/api/server.md†L1-L11】【F:docs/api/collaboration.md†L1-L8】.

## Mandatory Fixes

1. Ensure documentation and README keep emphasising that server and collaboration modules are placeholders.
2. Verify bundlers respect the `browser` field so `src/node` stays out of browser builds.
3. Monitor persistence logic against real ProseMirror documents to catch schema-specific issues.

## Optional Suggestions

- Convert synchronous file system calls in scripts to asynchronous versions.
- Expand integration tests for adapters using the example editors under `examples/`.

## Next Steps

Apply the label `ready-for:releasebot` when this review is addressed.
