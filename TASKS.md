# TASKS

## Epic: Change-Bar Completion

### Issue: Finalise change-bar implementation
- **Acceptance Criteria**
  - Bars reflect the highest-priority change per block (delete > substitute > add).
  - `--mr-bar-width` and `--mr-bar-style` CSS variables control bar width and dotted/solid style.
  - Bars rendered with a `::before` pseudo-element and `aria-hidden="true"`.
  - Bars auto-collapse when ≥10 consecutive bars span >30% of the viewport height.
  - Offset bars from callouts using `--mr-bar-offset`; auto-detect `aside` and `.admonition`.
- **Priority**: High
- **Estimate**: 3d
- **Labels**: frontend, accessibility, phase:1

### Issue: Performance test for DOM scan
- **Acceptance Criteria**
  - Automated test asserts DOM scan adds <5 ms parsing time on a 2 MB page.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: testing, qa, phase:1

## Epic: CLI Enhancements

### Issue: Optional Pandiff integration
- **Acceptance Criteria**
  - CLI supports `--pandiff` to compare revisions using Pandiff.
  - Exit codes propagate Pandiff results.
  - Documentation shows an example workflow with Pandiff.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: cli, enhancement, phase:1

## Epic: Documentation & Release

### Issue: Write theming and migration guides
- **Acceptance Criteria**
  - Docs cover colour overrides, `--mr-bar-offset`, and bar width/style variables.
  - Include notes on integrating Pandiff.
  - Troubleshooting section explains collapsing bars and performance tips.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: documentation, phase:1

### Issue: Publish beta 0.1.0 packages
- **Acceptance Criteria**
  - Packages released to PyPI and npm with matching versions.
  - Release notes summarise major features and known issues.
- **Priority**: Medium
- **Estimate**: 1d
- **Labels**: release, beta, phase:1

### Issue: General availability 1.0.0
- **Acceptance Criteria**
  - Bugs from beta resolved; CI passes with ≥90 % test coverage.
  - Announcement posted to Dev.to, Reddit and MkDocs discourse.
- **Priority**: Medium
- **Estimate**: 2d
- **Labels**: release, phase:1

## Epic: Testing & QA

### Issue: Accessibility audit
- **Acceptance Criteria**
  - All interactive elements have ARIA labels.
  - Colour contrast for additions and deletions meets WCAG‑AA (≥4.5∶1).
- **Priority**: High
- **Estimate**: 1d
- **Labels**: accessibility, qa, phase:1

## Epic: Phase 2 Planning

### Issue: Keybindings and advanced review tools
- **Acceptance Criteria**
  - `a` accepts edit under cursor and `r` rejects it in the browser.
  - Draft design for sidebar comments, Git attribution and VS Code extension.
- **Priority**: Low
- **Estimate**: 2d
- **Labels**: enhancement, phase:2

### Issue: Obsidian and Astro support exploration
- **Acceptance Criteria**
  - Evaluate feasibility of plugins for Obsidian and Astro.
  - Produce a short design document or proof of concept.
- **Priority**: Low
- **Estimate**: 3d
- **Labels**: obsidian, astro, phase:2
