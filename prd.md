### **Full Product Requirements Document — *MarkReview***

(Track‐changes for Markdown in MkDocs & Docusaurus)

---

## 0. Executive Summary

*MarkReview* adds Word‑style **track‑changes** — colour‑coded insertions, deletions, substitutions, comments **and now first‑class vertical change‑bars next to edited lines/blocks** — to any static site built with **MkDocs** or **Docusaurus**. It leverages the human‑readable **\[CriticMarkup]¹** syntax, existing parsers (`pymdownx.critic`, `remark-critic-markup`), and a lightweight slice of CSS + JS + CLI utilities. Installation is a one‑liner via **PyPI** or **npm**.

---

## 1. Problem Statement & Goals

| ID  | Problem                                                                   | Goal                                                                                    |
| --- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| P‑1 | Reviewers forced back to Word/Google Docs to visualise edits.             | Render clear inline diffs *inside* the docs site — incl. change‑bars for fast scanning. |
| P‑2 | Git diffs are noisy; no “accept/reject” in rendered view.                 | Offer **Original∕Markup∕Accepted** toggles & one‑click merge/strip.                     |
| P‑3 | Current CriticMarkup parsers expose raw `<ins>/<del>` without UI or bars. | Add vertical bars, colour themes, keyboard shortcuts, toolbar.                          |
| P‑4 | Authors need a painless way to strip edits before release.                | Provide CLI & CI hooks (`markreview accept/reject`).                                     |

---

## 2. Personas & Key User Stories

1. **Technical Writer** — “I push a branch; the preview highlights edits *and* shows a bar so the SME can skim.”
2. **SME Reviewer** — “I toggle *Original* view to read fluidly, then switch back to *Markup* to comment.”
3. **Doc Lead / CI** — “Before publishing, my pipeline runs `markreview accept` so the public site is squeaky‑clean.”

---

## 3. Scope

| Phase                  | Platforms                                    | Features                                                                                                                 |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Phase 1 (MVP)**      | MkDocs ≥9 + Material; Docusaurus v3 (MDX v3) | CriticMarkup parsing, coloured `<ins>/<del>`, **adaptive change‑bars**, mode toggle, CLI accept/reject, WCAG‑AA theming. |
| **Phase 2 (“Growth”)** | Same + Obsidian, Astro (stretch)             | Sidebar comments, Git attribution, bulk *Review* dashboard, VS Code extension.                                           |
| **Phase 3 (“Collab”)** | Live editors (Nextra, Next‑MDX)              | Real‑time multi‑user suggestions & presence indicators.                                                                  |

---

## 4. Functional Requirements

| ID      | Requirement                                                                                                                                                                                                                                                                                                                            | Priority |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F‑1     | Full CriticMarkup syntax: additions `{++ ++}`, deletions `{-- --}`, substitutions `{~~a~>b~~}`, comments `{>> <<}`, highlights `{== ==}`.                                                                                                                                                                                              | Must     |
| F‑2     | Render colours: **blue underline for additions**, **red strike for deletions**; configurable via CSS custom properties.                                                                                                                                                                                                                | Must     |
| **F‑3** | **Generate a 2–3 px vertical change‑bar along the inline‑start edge of any block containing at least one `<ins>`/`<del>`/`<span class="cm‑change">` node.** Bar colour follows highest‑priority change inside block (blue = add, red = delete, purple = substitute). Users may override width, colour, or “dotted” style via CSS vars. | Must     |
| F‑4     | Floating pill‑switch: *Original∕Markup∕Accepted* with local‑storage persistence.                                                                                                                                                                                                                                                       | Must     |
| F‑5     | Node CLI `markreview accept <glob>` / `reject` / `strip` with exit codes for CI.                                                                                                                                                                                                                                                        | Should   |
| F‑6     | Keybindings (Phase 2): `a` = accept under cursor, `r` = reject, `m` = toggle mode.                                                                                                                                                                                                                                                     | Should   |
| F‑7     | A11y: bars include `aria-hidden="true"`, edits labelled, contrast ≥ 4.5∶1 under both light/dark.                                                                                                                                                                                                                                       | Must     |
| F‑8     | Performance: added assets ≤ 8 KiB JS + 5 KiB CSS (gzip); DOM scan completes < 5 ms on 2 MB page.                                                                                                                                                                                                                                       | Must     |
| F‑9     | PyPI package `mkdocs‑markreview` ships with `pyproject.toml` as single source of truth; `requirements*.txt` are auto‑exported for alt envs.                                                                                                                                                                                             | Must     |

---

## 5. Non‑Functional Requirements

* **SemVer + Compatibility** — major bumps follow MkDocs/Docusaurus majors.
* **Security** — CSP‑safe; no `eval`; CLI sanitises paths.
* **Documentation** — “Getting‑started in 5 min”, theming cookbook, troubleshooting FAQ.
* **Code Quality** — Ruff + Black + Mypy gate CI; min 90 % unit‑test coverage.

---

## 6. System Architecture

```mermaid
graph TD
  subgraph Build‑time
    A[.md w/ CriticMarkup] -->|MkDocs| B[pymdownx.critic HTML]
    C[.mdx w/ CriticMarkup] -->|Docusaurus| D[remark-critic-markup HTML]
  end
  subgraph Runtime (Browser)
    B & D --> E[MarkReview JS]\n(scan DOM ‑> add `.mt‑changed` class)
    E --> F[CSS ::before pseudo‑element = change‑bar]
  end
  CLI[[markreview‑cli]] -. accept/reject .-> A & C
```

* **Change‑bar algorithm (JS)**

  1. Query `document.querySelectorAll('ins, del, span.cm-change')`.
  2. For each, ascend to nearest block element (`<p>,<li>,<td>,<th>,<h*>`).
  3. Add class `mt‑changed--add|del|subst` to parent.
  4. De‑duplicate via `WeakSet` to avoid multi‑bar.

* **CSS snippet**

```css
.mt‑changed { position: relative; }
.mt‑changed::before {
  content: "";
  position: absolute;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: -0.5rem; /* keeps layout stable */
  width: var(--mt-bar-width, 3px);
  background: var(--mt-bar-colour, red);
}
.mt‑changed--add::before   { --mt-bar-colour: var(--mt-col-add, #007aff); }
.mt‑changed--del::before   { --mt-bar-colour: var(--mt-col-del, #d83b01); }
.mt‑changed--subst::before { --mt-bar-colour: var(--mt-col-subst, #8856d8); }
```

---

## 7. Folder / Repo Structure (monorepo — pnpm workspaces)

```
markreview/
├─ packages/
│  ├─ mkdocs-markreview/
│  │  ├─ markreview/
│  │  │  ├─ __init__.py
│  │  │  ├─ plugin.py
│  │  │  └─ assets/
│  │  │     ├─ markreview.js  ⚑ change‑bar logic
│  │  │     └─ markreview.css ⚑ styles incl. bars
│  │  ├─ pyproject.toml  ← single‑source deps
│  │  └─ README.md
│  ├─ docusaurus-plugin-trackchanges/
│  │  ├─ src/
│  │  │  ├─ index.js
│  │  │  ├─ injectPlugin.js
│  │  │  ├─ markreview.css
│  │  │  └─ markreview.js
│  │  ├─ package.json
│  │  └─ README.md
│  └─ markreview-cli/
│     ├─ src/index.ts
│     ├─ package.json
│     └─ README.md
├─ docs/ (MkDocs demo)
├─ examples/
│  ├─ mkdocs-demo/
│  └─ docusaurus-demo/
└─ …
```

---

## 8. Implementation Timeline (Phase 1)

| Week | Deliverable                                                            | Owner     |
| ---- | ---------------------------------------------------------------------- | --------- |
| 1    | Initialise monorepo; PoC CriticMarkup render in MkDocs.                | Core      |
| 2    | **Implement change‑bar CSS + DOM scanner (incl. a11y).**               | Front‑end |
| 3    | Toolbar toggle; dark/light theming vars.                               | Front‑end |
| 4    | Docusaurus plugin wrapping `remark-critic-markup`.                     | Core      |
| 5    | Node CLI (`accept/reject/strip`) with unit tests (Vitest).             | Tooling   |
| 6    | Integration tests: mkdocs‑serve & docusaurus‑start on sample docs.     | QA        |
| 7    | Accessibility audit, performance profiling (< 5 ms scan).              | QA        |
| 8    | Beta 0.1.0 → PyPI + npm; collect feedback.                             | PM        |
| 9    | Bug‑fix sprint; write theming & migration guides.                      | All       |
| 10   | **Phase 1 GA** v1.0.0; announce on Dev.to, Reddit, & MkDocs discourse. | PM        |

---

## 9. Risks & Mitigations

| Risk                                         | Likelihood | Impact | Mitigation                                                                 |
| -------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------- |
| Bars overlap with left‑aligned callouts/ads. | Medium     | Medium | Provide `--mt-bar-offset` var; auto‑detect `aside, .admonition` and shift. |
| Extra DOM scan on huge pages (> 20 k nodes). | Low        | Low    | Throttle scan via `requestIdleCallback`; skip if `data-mt-skip`.           |
| CSS clashes with theme variables.            | Medium     | Medium | Prefix `.mt-*`, isolate vars, test top themes.                             |

---

## 10. Success Metrics

Unchanged (see v0); add **Usability score for change‑bar visibility ≥ 95 %** in hallway tests.

---

## 11. Decisions on Previously Open Questions

| Question                                          | Final Decision                                                                                                                                                                            | Notes                                                                                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bar colour: first or highest‑priority change?** | **Highest‑priority change wins (default: deletion > substitution > addition).**                                                                                                           | Gives reviewers an at‑a‑glance sense of *impact*. Rule can be overridden via `--mt-bar-colour-mode="first"` in plugin config.                          |
| **Expose dotted vs solid bar style?**             | **Surface as a CSS custom property (`--mt-bar-style`) in Phase 1; UI toggle deferred to Phase 2.**                                                                                        | Keeps bundle small while letting theme authors opt‑in: `--mt-bar-style: dotted 2px`. A toolbar button can be added alongside keybindings later.        |
| **Auto‑collapse long sequences of bars?**         | **Yes — ship a heuristic in Phase 1.** If ≥ 10 consecutive change‑bars span > 30 % of viewport height, MarkReview collapses them into a single bar with a clickable “▼ expand” affordance. | Prevents visual overload on large deletions while preserving detail on demand. Thresholds configurable (`mt-collapse-threshold`, `mt-collapse-ratio`). |

These decisions are now locked into v1.0 and reflected in updated Functional Requirements (F‑3, F‑8) and implementation tasks.
