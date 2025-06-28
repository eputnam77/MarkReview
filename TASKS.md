# TASKS

## Epic: Core Library Foundation

### Issue: Create TypeScript package `markreview`
- **Acceptance Criteria**
  - Folder `packages/markreview` contains `src/` with `index.ts`, `markreview.ts`, `markreview.css`, `cli.ts` and `types.ts`.
  - `dist/` directory generated via build script; package exports ESM and CJS bundles.
  - Added to `pnpm-workspace.yaml`.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: packaging, typescript, phase:1

### Issue: Migrate existing assets and logic
- **Acceptance Criteria**
  - Move JS/CSS from plugin assets into the new package.
  - CLI code consolidated under `packages/markreview`.
  - Build outputs consumed by existing integration packages.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: refactor, frontend, phase:1

### Issue: Node CLI accept/reject/strip commands
- **Acceptance Criteria**
  - `markreview accept <glob>` applies changes and exits `0` if all markup removed.
  - `markreview reject <glob>` reverts edits; `markreview strip` removes markup.
  - Non-zero exit code when CriticMarkup remains; unit tests via Vitest.
- **Priority**: High
- **Estimate**: 1d
- **Labels**: cli, phase:1

## Epic: Change-Bar & UI Features

### Issue: Advanced change-bar algorithm
- **Acceptance Criteria**
  - Bars generated per block with highest-priority change colour as in PRD lines 48‑53.
  - Supports `--mr-bar-width`, `--mr-bar-style` and auto‑collapse on long sequences.
  - Bars use `::before` with `aria-hidden="true"`.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: frontend, accessibility, phase:1

### Issue: Floating toolbar with mode and bar toggle
- **Acceptance Criteria**
  - Toolbar provides Original/Markup/Accepted switch and Show/Hide Bars button.
  - State persisted to `localStorage`.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: frontend, ui, phase:1

### Issue: Inline accept/reject buttons
- **Acceptance Criteria**
  - Each change displays ✓ Accept / ✗ Reject controls on hover as described in PRD lines 329‑358.
  - DOM updates immediately and rescans for bars.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: frontend, ui, phase:1

### Issue: Undo stack for accept/reject
- **Acceptance Criteria**
  - Provide undo functionality for recent accept/reject actions.
  - Shortcut `Ctrl+Z` restores last change; history limited to session.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: enhancement, phase:2

### Issue: Keyboard shortcuts
- **Acceptance Criteria**
  - `a` accept under cursor, `r` reject, `m` toggle view, `b` toggle bars.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: enhancement, phase:2

## Epic: Attribution & Comments

### Issue: Implement user attribution system
- **Acceptance Criteria**
  - Author metadata (name, avatar, timestamp) displayed next to each change per PRD lines 394‑431.
- **Priority**: High
- **Estimate**: 2d
- **Labels**: frontend, phase:1

### Issue: Comment system with threaded replies
- **Acceptance Criteria**
  - Inline comment boxes with reply threads and resolve state as specified around PRD lines 329‑387.
- **Priority**: High
- **Estimate**: 4d
- **Labels**: frontend, comments, phase:1

### Issue: Comment shortcuts
- **Acceptance Criteria**
  - `c` adds comment, `r` replies, `Ctrl+Enter` submits, `Esc` cancels, `Ctrl+R` resolves.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: enhancement, phase:2

### Issue: Sidebar comments and Git attribution
- **Acceptance Criteria**
  - Comments displayed in sidebar with links back to changes.
  - Each change optionally shows Git commit author when available.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: frontend, integration, phase:2

## Epic: Suggestions & History

### Issue: Change suggestions support
- **Acceptance Criteria**
  - `{~~original~>suggestion~~}` handled separately from main text.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: frontend, phase:2

### Issue: Change history and audit trail
- **Acceptance Criteria**
  - Track all accept/reject actions with timestamps and authors.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: backend, history, phase:2

### Issue: Bulk operations on selections
- **Acceptance Criteria**
  - Multi-select changes with Shift+click and Ctrl+A; apply accept/reject to group.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: frontend, enhancement, phase:2

## Epic: Advanced Review Tools

### Issue: Bulk Review dashboard
- **Acceptance Criteria**
  - Dashboard lists all changes with filters and bulk accept/reject options.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: frontend, phase:2

### Issue: VS Code extension
- **Acceptance Criteria**
  - Extension highlights CriticMarkup in Markdown files and provides accept/reject actions.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: tooling, vscode, phase:2

## Epic: Export & Reporting

### Issue: Export reports to PDF, CSV and JSON
- **Acceptance Criteria**
  - CLI and API produce reports with change and comment data as outlined in PRD lines 1050‑1237.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: cli, export, phase:1

### Issue: Export UI components
- **Acceptance Criteria**
  - Floating export button and configuration dialog per PRD lines 1200‑1241.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: frontend, export, phase:1

### Issue: CI/CD export workflow example
- **Acceptance Criteria**
  - Repository includes sample GitHub Action demonstrating `markreview export` commands.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: ci, docs, phase:1

## Epic: Performance & Accessibility

### Issue: Performance test for DOM scan
- **Acceptance Criteria**
  - Automated test asserts scanning adds <5 ms on a 2 MB page.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: testing, perf, phase:1

### Issue: Accessibility audit
- **Acceptance Criteria**
  - All interactive elements have ARIA labels; colour contrast ≥4.5∶1.
- **Priority**: High
- **Estimate**: 1d
- **Labels**: accessibility, qa, phase:1

## Epic: Editor Integrations

### Issue: Integration modules for TipTap, Milkdown and Toast UI
- **Acceptance Criteria**
  - Exported helpers to attach MarkReview to each editor with event hooks.
- **Priority**: Medium
- **Estimate**: 3d
- **Labels**: integrations, phase:1

### Issue: Integration tests for editors
- **Acceptance Criteria**
  - Examples and tests proving MarkReview works with each framework.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: testing, integration, phase:1

## Epic: Release & Documentation

### Issue: Write theming and migration guides
- **Acceptance Criteria**
  - Docs cover CSS variables, bar offset, and export workflow.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: documentation, phase:1

### Issue: Publish beta 0.1.0 packages
- **Acceptance Criteria**
  - Packages released to PyPI and npm with release notes.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: release, beta, phase:1

### Issue: General availability 1.0.0
- **Acceptance Criteria**
  - Bugs from beta resolved; CI passes with ≥90 % coverage; announcements posted.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: release, phase:1

## Epic: Remove Obsolete Features

### Issue: Drop Pandiff integration
- **Acceptance Criteria**
  - Delete `pandiff.js`, related tests and documentation.
  - Remove references from existing CLI code.
- **Priority**: High
- **Estimate**: 0.5d
- **Labels**: cleanup, cli, phase:1

### Issue: Remove Obsidian/Astro placeholders
- **Acceptance Criteria**
  - Delete `obsidian.py` and its tests; purge docs mentioning Obsidian.
- **Priority**: Medium
- **Estimate**: 0.5d
- **Labels**: cleanup, phase:1

## Epic: Folder Restructure

### Issue: Organise examples directory
- **Acceptance Criteria**
  - Examples moved under `examples/basic-html`, `examples/tiptap-editor` and `examples/toast-ui-editor`.
- **Priority**: Medium
- **Estimate**: 0.5d
- **Labels**: examples, docs, phase:1

### Issue: Remove `packages/markreview-cli` after migration
- **Acceptance Criteria**
  - All CLI functionality lives in `packages/markreview`; old package deleted and workspace updated.
- **Priority**: Medium
- **Estimate**: 0.5d
- **Labels**: cleanup, packaging, phase:1

## Epic: Collaboration Features

### Issue: Real-time presence indicators
- **Acceptance Criteria**
  - Display active reviewers and cursors in supported editors.
- **Priority**: Low
- **Estimate**: 3d
- **Labels**: collaboration, phase:3

### Issue: WebSocket collaboration server
- **Acceptance Criteria**
  - Node-based server broadcasts document changes and presence events.
- **Priority**: Low
- **Estimate**: 4d
- **Labels**: backend, phase:3

### Issue: Conflict detection and resolution
- **Acceptance Criteria**
  - Detect concurrent edits and surface merge options to users.
- **Priority**: Low
- **Estimate**: 3d
- **Labels**: collaboration, phase:3

### Issue: Collaborative review workflows
- **Acceptance Criteria**
  - Approvals and change requests tracked per reviewer with notifications.
- **Priority**: Low
- **Estimate**: 3d
- **Labels**: workflow, phase:3

### Issue: Performance optimisation for real-time collab
- **Acceptance Criteria**
  - Maintain sub-100 ms latency with 10 concurrent users in tests.
- **Priority**: Low
- **Estimate**: 2d
- **Labels**: perf, phase:3

### Issue: Phase 3 GA release
- **Acceptance Criteria**
  - All collaboration features stable; documentation updated; version 3.0.0 tagged.
- **Priority**: Low
- **Estimate**: 2d
- **Labels**: release, phase:3

