# TASKS

## Epic: Monorepo Setup & MkDocs Proof of Concept

### Issue: Initialise workspace and MkDocs PoC
- **Acceptance Criteria**
  - Repository follows the folder layout from PRD section 7.
  - `pnpm-workspace.yaml` lists all packages; Python packages use `pyproject.toml`.
  - MkDocs demo site renders CriticMarkup using the plugin.
- **Labels**: core, mkdocs, phase:1

## Epic: Change-Bar Implementation & UI

### Issue: Implement change-bar CSS and DOM scanner
- **Acceptance Criteria**
  - JS scans `ins`, `del`, and substitution spans then adds `mt-changed--add|del|subst` classes to parent blocks.
  - CSS draws a 2–3 px bar on the inline-start edge; colour follows highest-priority change.
  - Bars have `aria-hidden="true"` and can be customised via CSS variables including `--mt-bar-style`.
  - Change bars collapse when ≥10 consecutive bars exceed 30 % of the viewport height.
- **Labels**: frontend, accessibility, phase:1

### Issue: Mode toggle with theming
- **Acceptance Criteria**
  - Floating switch toggles Original∕Markup∕Accepted view and persists via `localStorage`.
  - Toggle works in both light and dark themes using CSS custom properties.
  - View can be cycled with the `m` key.
- **Labels**: frontend, mkdocs, phase:1

## Epic: Docusaurus Support

### Issue: Create Docusaurus plugin
- **Acceptance Criteria**
  - Plugin wraps `remark-critic-markup` and injects assets into `static/`.
  - `injectHtmlTags()` returns `<link>` and `<script>` tags using the configured base URL.
  - Example Docusaurus site builds with change bars and toggle enabled.
- **Labels**: docusaurus, phase:1

## Epic: MarkTrace CLI

### Issue: Implement accept/reject/strip commands
- **Acceptance Criteria**
  - `marktrace <accept|reject|strip> <glob>` processes matching files using critic-markup.
  - Exits with code `1` if markup remains after processing, otherwise `0`.
  - Unit tests cover all modes.
- **Labels**: cli, tooling, phase:1

## Epic: Testing & QA

### Issue: Integration tests for MkDocs and Docusaurus
- **Acceptance Criteria**
  - CI runs `mkdocs build` and `docusaurus build` on sample projects.
  - Output includes `marktrace.js` and `marktrace.css` in the site directories.
  - Tests assert asset size ≤8 KiB JS and ≤5 KiB CSS; DOM scan under 5 ms on a 2 MB page.
- **Labels**: testing, qa, phase:1

### Issue: Accessibility audit
- **Acceptance Criteria**
  - All interactive elements have ARIA labels.
  - Colour contrast for additions and deletions meets WCAG‑AA (≥4.5∶1).
- **Labels**: accessibility, qa, phase:1

## Epic: Documentation & Release

### Issue: Write theming and migration guides
- **Acceptance Criteria**
  - Docs explain how to override colours and `--mt-bar-offset`.
  - Troubleshooting section covers collapsing bars and performance hints.
- **Labels**: documentation, phase:1

### Issue: Publish beta 0.1.0 packages
- **Acceptance Criteria**
  - Packages released to PyPI and npm with matching versions.
  - Release notes summarise major features and known issues.
- **Labels**: release, beta, phase:1

### Issue: General availability 1.0.0
- **Acceptance Criteria**
  - Bugs from beta resolved; CI passes with ≥90 % test coverage.
  - Announcement posted to Dev.to, Reddit and MkDocs discourse.
- **Labels**: release, phase:1

## Epic: Phase 2 Planning

### Issue: Keybindings and advanced review tools
- **Acceptance Criteria**
  - `a` accepts edit under cursor and `r` rejects it in the browser.
  - Initial design for sidebar comments, Git attribution and VS Code extension drafted.
- **Labels**: enhancement, phase:2
