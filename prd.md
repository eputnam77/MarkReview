### \*\*Full Product Requirements Document — *MarkTrace*

(Track-changes for Markdown in MkDocs & Docusaurus)\*\*

---

## 0. Executive Summary

*MarkTrace* brings Word-style **track-changes** (colour-coded insertions, deletions, substitutions, comments, vertical change-bars, & accept/reject tools) to any static-site built with **MkDocs** or **Docusaurus**.
It relies on the widely-used **CriticMarkup** plaintext syntax([fletcher.github.io][1]) and glues together existing parsers (`pymdownx.critic` for Python([squidfunk.github.io][2]) and `remark-critic-markup` for MDX([npmjs.com][3])) with a thin layer of CSS, JS, and optional CLI utilities (`critic-markup` npm package for programmatic accept/reject([npmjs.com][4])). The result is a drop-in dependency you can install with a single `pip` or `npm` command.

---

## 1. Problem Statement & Goals

| ID  | Problem                                                                                   | Goal                                                               |
| --- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| P-1 | Reviewers forced back to Word/Google Docs to visualise edits.                             | Show clear inline diffs **inside** the generated docs site.        |
| P-2 | Git diffs are noisy; no “accept/reject” in rendered view.                                 | Offer **Original ∕ Markup ∕ Accepted** toggles & one-click merge.  |
| P-3 | Current CriticMarkup parsers expose raw `<ins>/<del>` without change-bars or UI controls. | Add vertical bars, colour themes, keyboard shortcuts, & a toolbar. |
| P-4 | Authors need a painless way to strip edits before release.                                | Provide CLI & CI hooks (`marktrace accept/reject`).                |

---

## 2. Personas & Key User Stories

1. **Technical Writer** — “I push a branch with suggested edits; the preview site highlights them in blue/red and shows a bar so the SME can scan quickly.”
2. **SME Reviewer** — “I toggle *Original* view to read fluidly, then switch back to *Markup* to comment.”
3. **Doc Lead / CI** — “Before publishing, my pipeline runs `marktrace accept` so the public site is squeaky-clean.”

---

## 3. Scope

| Phase                  | Platforms                                   | Features                                                                                                                                          |
| ---------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1 (MVP)**      | MkDocs 9 + Material; Docusaurus v3 (MDX v3) | Parsing, coloured `<ins>/<del>`, change-bars, mode toggle, CLI accept/reject, WCAG-AA theming.                                                    |
| **Phase 2 (“Growth”)** | Same + Obsidian, Astro (stretch)            | Sidebar comments panel, Git attribution (hover shows author & commit time), bulk *Review* dashboard, VS Code extension with inline accept/reject. |
| **Phase 3 (“Collab”)** | Live doc editors (e.g., Nextra, Next-MDX)   | Real-time multi-user suggestions, WebSocket sync, presence indicators.                                                                            |

---

## 4. Functional Requirements

| ID  | Requirement                                                                                                                               | Priority |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F-1 | Full CriticMarkup syntax: additions `{++ ++}`, deletions `{-- --}`, substitutions `{~~a~>b~~}`, comments `{>> <<}`, highlights `{== ==}`. | Must     |
| F-2 | Render colours: **blue underline for additions**, **red strike for deletions**; configurable via CSS vars.                                | Must     |
| F-3 | 3 px solid vertical bar at left of any block containing edits (DOM mutation in JS after load).                                            | Must     |
| F-4 | Floating pill-switch: *Original ∕ Markup ∕ Accepted* with local-storage persistence.                                                      | Must     |
| F-5 | Keybindings: `a` = accept under cursor, `r` = reject, `m` = toggle mode (Phase 2).                                                        | Should   |
| F-6 | Node CLI `marktrace accept <glob>` / `reject` / `strip` with exit codes for CI.                                                           | Should   |
| F-7 | VS Code extension: CriticMarkup token colours + commands (Phase 2).                                                                       | Could    |
| F-8 | A11y: `aria-label` on edits, contrast ≥ 4.5:1 in both light & dark themes.                                                                | Must     |
| F-9 | Perf: added assets ≤ 8 KiB (JS) + 5 KiB (CSS) gzip, FCP delta < 20 ms.                                                                    | Must     |

---

## 5. Non-Functional Requirements

* **SemVer & compatibility:** major bumps follow MkDocs/Docusaurus majors.
* **Security:** no dynamic `eval`; CSP-safe; CLI sanitises paths.
* **Documentation:** Getting-started in 5 mins; theming cookbook; troubleshooting FAQ.

---

## 6. System Architecture

```mermaid
graph TD
  subgraph Build-time
    A[.md with CriticMarkup] -->|MkDocs| B[pymdownx.critic HTML]
    C[.mdx w/ CriticMarkup] -->|Docusaurus| D[remark-critic-markup HTML]
  end
  subgraph Runtime (Browser)
    B & D --> E[MarkTrace JS] --> F[CSS change-bars + toggle UI]
  end
  CLI[[marktrace-cli]] -. accept/reject .-> A & C
```

* **MkDocs plugin (`mkdocs-marktrace`)**

  * Hooks `on_config` → injects `pymdownx.critic`.
  * Hooks `on_post_page` → appends `<script>` & `<link>` tags.
* **Docusaurus plugin (`@marktrace/docusaurus-plugin-trackchanges`)**

  * Adds `remark-critic-markup` to MDX pipeline.
  * Emits same JS/CSS assets from `/static`.
* **CLI** — Thin wrapper over `critic-markup` parser for batch merge.

---

## 7. Folder / Repo Structure  *(monorepo with pnpm workspaces)*

```
marktrace/
├─ packages/
│  ├─ mkdocs-marktrace/
│  │  ├─ marktrace/
│  │  │  ├─ __init__.py
│  │  │  ├─ plugin.py
│  │  │  └─ assets/        # JS, CSS, icons
│  │  ├─ pyproject.toml
│  │  └─ README.md
│  ├─ docusaurus-plugin-trackchanges/
│  │  ├─ src/
│  │  │  ├─ index.js
│  │  │  ├─ injectPlugin.js
│  │  │  ├─ marktrace.css
│  │  │  └─ marktrace.js
│  │  ├─ package.json
│  │  └─ README.md
│  └─ marktrace-cli/
│     ├─ src/index.ts
│     ├─ package.json
│     └─ README.md
├─ docs/          # MkDocs site documenting usage
├─ examples/
│  ├─ mkdocs-demo/
│  └─ docusaurus-demo/
├─ .github/workflows/ci.yml
├─ CHANGELOG.md
├─ LICENSE
└─ README.md
```

---

## 8. Implementation Timeline

| Week | Deliverable                                                        | Owner     |
| ---- | ------------------------------------------------------------------ | --------- |
| 1    | Initialise monorepo; PoC render in MkDocs via `pymdownx.critic`.   | Core      |
| 2    | Draft change-bar CSS + JS DOM scanner.                             | Front-end |
| 3    | Toolbar toggle component; dark/light theming vars.                 | Front-end |
| 4    | Docusaurus plugin wrapping `remark-critic-markup`.                 | Core      |
| 5    | Node CLI (`accept/reject/strip`) with unit tests (Jest).           | Tooling   |
| 6    | Integration tests: mkdocs-serve & docusaurus-start on sample docs. | QA        |
| 7    | Accessibility audit, perf budget checks.                           | QA        |
| 8    | Beta 0.1.0 → PyPI + npm; collect feedback.                         | PM        |
| 9    | Bug-fix sprint; write migration & theming guides.                  | All       |
| 10   | **Phase 1 GA** release 1.0.0; announce on Dev.to & Reddit.         | PM        |

---

## 9. Phase 2 Roadmap (post-MVP)

| Feature                                                           | Rationale                                      | Est. Effort |
| ----------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| Sidebar comments panel (collapsible)                              | Dense documents need better comment browsing.  | 2 weeks     |
| Git author/time attribution on hover                              | Reviewers want context for edits.              | 1 week      |
| VS Code extension (CriticMarkup grammar + accept/reject commands) | Streamline authoring inside IDE.               | 3 weeks     |
| Bulk *Review Dashboard* summarising unresolved edits              | Helps leads manage large doc sets.             | 1 week      |
| Third-party SSG adapters (Obsidian, Astro, Next-MDX)              | Broaden user-base.                             | 3 weeks     |
| Real-time multi-user suggestions via WebSockets (Phase 3)         | Collaborative editing parity with Google Docs. | 4 weeks+    |

---

## 10. Risks & Mitigations

| Risk                                                  | Likelihood | Impact | Mitigation                                                                                     |
| ----------------------------------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------- |
| Theme CSS clashes                                     | Medium     | Medium | Prefix all classes `.mt-*`, expose vars for overrides, test on top 3 MkDocs/Docusaurus themes. |
| Large diffs hurt readability                          | Low        | Low    | Add fold/unfold button per block, “hide markup” mode default.                                  |
| CriticMarkup conflicts with other markdown extensions | Medium     | Medium | Offer opt-in alt delimiters (`{>>` prefix) via config.                                         |
| Accessibility regressions                             | Low        | High   | WCAG audit each release; CI checks for colour contrast.                                        |

---

## 11. Success Metrics

| Metric                        | Target (12 mo post-launch) |
| ----------------------------- | -------------------------- |
| PyPI + npm downloads          | ≥ 1 k / week               |
| Avg. setup time in user tests | ≤ 5 min                    |
| Site Performance delta (FCP)  | < 20 ms                    |
| User Satisfaction (survey)    | ≥ 90 % positive            |
| GitHub stars                  | ≥ 800                      |

---

## 12. Open Questions

1. Should comments migrate to a right-hand sidebar by default in Phase 2?
2. Best way to store author/time info: parse `git blame` at build-time or user front-matter?
3. Will we package dark-mode and high-contrast themes separately or derive all via CSS vars?

---

### *Bottom line*: **MarkTrace** leverages existing CriticMarkup parsers to deliver first-class track-changes for Markdown docs with minimal overhead. Phase 1 focuses on the core diff experience; later phases add richer review UX and broader ecosystem support.
