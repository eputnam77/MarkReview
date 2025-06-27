# AGENTS.md
*Authoritative playbook for the OpenAI Codex multi-agent workflow in this monorepo*

---

## 0 · Global Settings ( Python side only )
| Key                  | Value / Path                                                  |
| -------------------- | ------------------------------------------------------------- |
| Python package root  | `packages/mkdocs-markreview/`                                 |
| Source dir           | `packages/mkdocs-markreview/mkdocs_markreview/`               |
| Test dir             | `packages/mkdocs-markreview/tests/`                           |
| Python version       | **3.12**                                                      |
| Package manager      | **poetry** (`poetry install --with dev`)                      |
| Test runner          | **pytest** + **pytest-cov**                                   |
| Coverage thresholds  | 70 % (feature branches) → 90 % (`main`)                       |
| Code formatter       | **black**                                                     |
| Linter               | **ruff** (import-sort on)                                     |
| Type checker         | **mypy --strict**                                             |
| Security scanner     | **bandit -r mkdocs_markreview -lll**                          |
| Doc generator        | **MkDocs Material** (JS packages use their own tools)         |
| CI provider          | **GitHub Actions**                                            |

> **JavaScript packages** in this repo use **pnpm workspaces** and have their own `package.json` workflows;  
> the table above applies **only to the Python plugin**.

---

## 1 · Agents & Execution Order

| # | Agent ID    | Purpose (summary)                                                       | Auto-trigger condition          |
|---|-------------|-------------------------------------------------------------------------|---------------------------------|
| 0 | `planner`   | Parse `PRD.md`, create `TASKS.md` (issues & labels).                    | manual                          |
| 1 | `architect` | Folder layout, ADRs, initial `pyproject.toml`, CI skeleton.             | `planner` PR merged             |
| 2 | `scaffolder`| Generate skeleton code/tests in **packages/mkdocs-markreview**.        | `architect` PR merged           |
| 3 | `builder`   | Implement code for **ready** issues; must satisfy the *dev gate*.      | new ready issue                 |
| 4 | `linter`    | `ruff --fix` + `black`; open PR if diff.                               | after builder push              |
| 5 | `fixer`     | Patch whatever fails the gate until green.                             | any gate failure                |
| 6 | `security`  | Bandit & pip-audit, open CVE issues.                                   | nightly · before merge → `main` |
| 7 | `docwriter` | Update README, changelog, MkDocs site.                                 | branch green & cov ≥ 90 %       |
| 8 | `reviewer`  | Human-style review; request approvals.                                 | after docwriter                 |
| 9 | `releasebot`| Tag, build wheel, publish release.                                     | PR merged → `main`              |

**Handoff rule**  
Each agent that passes its tasks adds `ready-for:<next-agent>`;  
the GitHub Action router reads that label and launches the next agent.

---

## 2 · Quality Gate (executed by CI, not a separate agent)

```bash
# run from packages/mkdocs-markreview
ruff check mkdocs_markreview tests
black --check mkdocs_markreview tests
mypy --strict mkdocs_markreview
bandit -r mkdocs_markreview -lll --skip B101        # asserts allowed on feature branches
pytest -q --cov=mkdocs_markreview --cov-fail-under=70
```

On the main branch the CI job raises the coverage minimum to 90 % and drops --skip B101.
Any failure pushes control to fixer.

---

## 3 · Branch & Commit Policy

* **Branches**  `plan/<slug>` · `scaffold/<slug>` · `feat/<slug>` · `fix/<issue>` · `docs/<topic>` · `test/<scope>`
* **Commits** follow Conventional Commits, e.g.

  ```
  feat(auth): add OAuth2 login flow
  fix(api): prevent division‑by‑zero in calculator
  chore(ci): raise coverage threshold to 90%
  ```
* Default merge strategy: **squash‑merge**, with required‑status checks on `main`.

---

## 4 · Automation Workflow (GitHub Actions)

The central router (`.github/workflows/agents.yml`) decides which agent to launch next:

```yaml
jobs:
  python-dev-gate:
    runs-on: ubuntu-latest
    defaults:
      working-directory: packages/mkdocs-markreview
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install Poetry
        run: pip install poetry

      - name: Install project + dev deps
        run: poetry install --no-interaction --with dev

      - name: Run Dev Gate
        run: |
          ruff check mkdocs_markreview tests
          black --check mkdocs_markreview tests
          mypy --strict mkdocs_markreview
          bandit -r mkdocs_markreview -lll --skip B101
          pytest -q --cov=mkdocs_markreview --cov-fail-under=70

```

---

## 5 · Environment Setup

* **Python 3.12** via `pyenv` or container.
* Local dev startup:

  ```bash
  uv venv
  uv pip install -r requirements-dev.txt
  pre-commit install
  ```
* Codespaces/VS Code: devcontainer runs pre‑commit on open.

---

## 6 · Failure‑Recovery Matrix
Tester row removed – fixer now handles any gate failures raised by CI.

| Problem            | Responsible Agent | Remedy                         |
| ------------------ | ----------------- | ------------------------------ |
| Lint error         | linter            | Auto‑fix & push                |
| Type error         | tester → fixer    | Patch types/code               |
| Test failure       | fixer             | Minimal diff fix, ensure green |
| Coverage drop      | builder/tester    | Add tests or mark exceptions   |
| High CVE           | security          | Bump dependency or patch code  |
| Docs build failure | docwriter         | Regenerate & push fix          |

---

## 7 · References

* [Ruff documentation](https://docs.astral.sh/ruff/)
* [Black documentation](https://black.readthedocs.io/)
* [Pytest documentation](https://docs.pytest.org/)
* [Bandit documentation](https://bandit.readthedocs.io/)
* [pip‑audit](https://pypi.org/project/pip-audit/)

---

*End of AGENTS.md*
