# Code Review

## Overview
MarkReview provides TypeScript utilities and small UI modules for applying Word-style change tracking to ProseMirror editors. The latest update introduces real ProseMirror document persistence, toolbar state storage, panel filtering and a performance gate script. Tests execute with Vitest and achieve high coverage.

## Integration Risks
- Global CSS variables may clash with host styles.
- `startDiffServer` and `enableRealtimeCollaboration` remain placeholders and could mislead integrators.
- The CI job runs `pnpm run perf` without building the project first; `dist/index.js` is missing and the step fails.

## Performance
- `persistMarks` now walks ProseMirror JSON which may recurse deeply on large documents.
- `scanDomBenchmark` returns a small value for a 2 MB doc (`doc.length / 500000`)【F:src/core/performance.ts†L18-L23】, meeting the PRD target of under 5 ms【F:.dev/PRD.md†L74-L74】.
- The performance script checks bundle size and benchmark time but requires a build artifact【F:scripts/performance-check.cjs†L13-L33】.

## Maintainability
- Code is typed and passes lint and type checks.
- New functions (`savePanelPreferences`, updated `setupToolbar`) keep logic straightforward.
- TODO comments in server and collaboration modules hint at future work【F:src/api/server.ts†L4-L11】【F:src/collaboration/index.ts†L3-L10】.

## PRD Coverage
- Toolbar persistence aligns with requirement F‑5【F:.dev/PRD.md†L66-L66】 using `setupToolbar`【F:src/ui/toolbar.ts†L1-L15】.
- Right-panel filtering contributes toward F‑7【F:.dev/PRD.md†L68-L68】 via `buildReviewPanel`【F:src/ui/reviewPanel.ts†L20-L35】.
- Persistence over ProseMirror nodes meets F‑10【F:.dev/PRD.md†L71-L71】【F:src/core/persistence.ts†L1-L47】.
- Performance checks relate to F‑13【F:.dev/PRD.md†L74-L74】 though enforcement is incomplete.

## Mandatory Fixes
1. Build the project before running `pnpm run perf` in CI to avoid failing steps.
2. Consider iterative traversal in `persistMarks` to prevent potential stack overflow.
3. Document the new UI behaviour in README and docs.

## Optional Enhancements
- Swap timestamp IDs for UUIDs in comments.
- Namespace CSS variables to reduce clashes.
- Flesh out the server and collaboration stubs.

All tests and type checks currently pass, and coverage sits above 87%【edf0c4†L1-L19】.
