# TASKS

## Epic: Repository Restructure and Build Setup

### Issue: Initialize core package layout
- **Acceptance Criteria**
  - `src/` directory contains `core/`, `ui/`, `adapters/`, `keymap/`, `diff-headless/`, and `styles.css` as per PRD section 8.
  - `package.json` at repo root defines build scripts for ESM and CJS output,
    sets `"sideEffects": false`, and declares
    `peerDependencies` for `prosemirror-*` `^1.23.0`.
  - Storybook and examples folders created.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: setup, packaging, phase:1

### Issue: Remove legacy CLI and MkDocs/Docusaurus plugins
- **Acceptance Criteria**
  - `packages/markreview-cli`, `packages/mkdocs-markreview`, and `packages/docusaurus-plugin-trackchanges` deleted.
  - References dropped from workspace configuration and docs.
- **Priority**: High
- **Estimate**: 1d
- **Labels**: cleanup, phase:1

## Epic: Core Functionality

### Issue: CriticMarkup parser with accessible palette
- **Acceptance Criteria**
  - Parse and render add, delete, substitute, highlight, and comment marks (F-1).
  - Colours defined via CSS variables providing WCAG‑AA contrast (F-3).
  - Jest unit tests cover parsing logic at ≥90 %.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: core, accessibility, phase:1

### Issue: Track format changes
- **Acceptance Criteria**
  - Bold/italic/list/paragraph transformations recorded as format-change marks (F-2).
  - Visual styling distinguishes format changes from insertions/deletions.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: core, formatting, phase:1

### Issue: Persist marks in ProseMirror documents
- **Acceptance Criteria**
  - Accept/reject actions update the underlying document while preserving history (F-10).
  - Export with tracking disabled produces clean text without marks.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: core, persistence, phase:1

## Epic: Review UI Components

### Issue: Change‑bar decoration module
- **Acceptance Criteria**
  - Margin bars appear left or right with configurable width and colour; RTL docs auto‑swap sides (F-4).
  - Bars use `::before` pseudo elements and do not disrupt layout.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: ui, accessibility, phase:1

### Issue: Toolbar toggles
- **Acceptance Criteria**
  - Toolbar provides Track Changes and Show Bars buttons; state saved to `localStorage` (F-5).
- **Priority**: High
- **Estimate**: 1d
- **Labels**: ui, phase:1

### Issue: Pop‑up accept/reject/comment widget
- **Acceptance Criteria**
  - Inline controls display ✓/✗/💬 on hover with shortcuts `a`, `r`, `c` (F-6).
  - Actions immediately update the document and reapply decorations.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: ui, interactions, phase:1

### Issue: Threaded comments system
- **Acceptance Criteria**
  - Comments support replies, resolve/unresolve state, and `@mentions` (F-8).
  - Metadata includes user avatar and timestamp via `getCurrentUser()` hook (F-9).
- **Priority**: High
- **Estimate**: 4d
- **Labels**: comments, ui, phase:1

### Issue: Right‑panel review list
- **Acceptance Criteria**
  - Panel shows cards for each change with counters, filter chips and text search (F-7).
  - Keyboard navigation using ↑/↓ and Enter; collapsible on small screens.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: ui, panel, phase:1

## Epic: Editor Adapters & API

### Issue: Generic attach API and headless diff export
- **Acceptance Criteria**
  - `MarkReview.attach(editor, options)` mounts the core on any ProseMirror ≥1.23 instance (F-12).
  - `diffDoc(oldDoc, newDoc)` returns structured diff data without DOM usage.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: api, adapters, phase:1

### Issue: TipTap, Toast UI and Milkdown adapters
- **Acceptance Criteria**
  - Adapter modules initialise MarkReview and sync accept/reject commands with each framework.
  - Example editors under `examples/` demonstrate integration.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: integrations, examples, phase:1

### Issue: Keyboard‑map utility and preferences UI
- **Acceptance Criteria**
  - Shortcuts defined using `event.code`; users can remap keys via a settings dialog (F-11).
  - Playwright tests validate QWERTY, AZERTY and QWERTZ layouts.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: keymap, testing, phase:1

## Epic: Documentation and Quality

### Issue: Documentation site update
- **Acceptance Criteria**
  - `docs/` includes user guide, help/FAQ, and updated PRD and TASKS files (F-14).
  - Example code snippets and accessibility notes provided.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: docs, accessibility, phase:1

### Issue: CI pipeline with linting and coverage
- **Acceptance Criteria**
  - GitHub Actions run ESLint, Prettier, Jest and Playwright with coverage ≥90 % as specified in PRD section 5.
  - Security checks run `npm audit` and `pip-audit`; workflow fails on detected vulnerabilities.
  - Static scan ensures no network calls (`fetch`, `axios`) in the core package.
- **Priority**: High
- **Estimate**: 1d
- **Labels**: ci, quality, phase:1

### Issue: Bundle size and performance tests
- **Acceptance Criteria**
  - Automated check ensures JS ≤10 kB and CSS ≤5 kB gzipped (F-13).
  - DOM scan benchmark on a 2 MB document stays under 5 ms.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: perf, testing, phase:1

### Issue: Accessibility and internationalisation audit
- **Acceptance Criteria**
  - All interactive elements meet WCAG 2.2 AA contrast and have ARIA labels; locale JSON files support translation.
- **Priority**: High
- **Estimate**: 1d
- **Labels**: accessibility, i18n, phase:1

### Issue: Security review and SemVer policy
- **Acceptance Criteria**
  - Codebase contains no network calls; tooling checks for `fetch` or `axios` usage.
  - CI includes `npm audit` and `pip-audit` with failures blocking merges.
  - README documents the SemVer strategy aligned with host-editor major versions.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: security, docs, phase:1

### Issue: 0.1 alpha release
- **Acceptance Criteria**
  - Publish package to npm; docs highlight preview limitations.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: release, phase:1

### Issue: 1.0 GA polish
- **Acceptance Criteria**
  - Resolve beta feedback and ship example videos showcasing core workflows.
  - Finalise documentation and CHANGELOG for the 1.0.0 release.
  - Tag version 1.0.0 following SemVer guidelines.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: release, phase:1

## Epic: Future Expansion

### Issue: Bulk accept/reject and export formats
- **Acceptance Criteria**
  - Support bulk operations and export to DOCX/PDF/CSV/JSON as outlined in PRD section 13.
- **Priority**: Low
- **Estimate**: 4d
- **Labels**: export, enhancement, phase:2

### Issue: Hosted diff API service
- **Acceptance Criteria**
  - Standalone Node service exposes `diffDoc` over HTTP with authentication.
- **Priority**: Low
- **Estimate**: 3d
- **Labels**: backend, api, phase:2

### Issue: Real‑time collaboration features
- **Acceptance Criteria**
  - Presence indicators, revision history and conflict resolution for live editors.
- **Priority**: Low
- **Estimate**: 5d
- **Labels**: collaboration, phase:3

