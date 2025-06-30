# MarkReview Monorepo

MarkReview adds lightweight review tools to any ProseMirror based editor. It includes a MkDocs plugin that renders CriticMarkup, a tiny CLI for applying edits and a small set of helper utilities.

## Using MarkReview in Your Project

Install the plugin for your static site generator and enable it in your configuration.
For isolated testing, create and activate a virtual environment in your site project
(for example with `python -m venv .venv` and `source .venv/bin/activate` on
macOS/Linux or `.venv\Scripts\activate` on Windows). Run the installation
```bash
pip install -e .
```
After installing, open your MkDocs project in your IDE (for example VS Code)
and list the plugin in `mkdocs.yml`.

### MkDocs

Add the plugin name to the `plugins` section of your `mkdocs.yml`:

```yaml
# mkdocs.yml
plugins:
  - mkdocs_markreview
```

Start your site with `mkdocs serve`.

**Accepting or rejecting edits in the browser does not modify your source files.**
Use the `markreview` CLI to apply changes and restart the dev server.

```bash
markreview accept docs/**/*.md
mkdocs serve
```

You can override the highlight colours in your CSS:

```css
:root {
  --markreview-add-color: #0044ff;
  --markreview-del-color: #d20f39;
}
```

The plugin automatically injects the runtime assets so tracked changes appear without manual imports.

See the [docs](docs/index.md) for setup and usage instructions.
The [API reference](docs/api/index.md) describes the CLI and plugin modules.

## Features

- Attach to any ProseMirror editor with a single call:

```ts
import { attach } from 'markreview'
const controller = attach(editor)
controller.acceptAll()
```

- Comment threads stored with `CommentThread` helpers.
- Headless `diffDoc()` for simple comparisons.
- Remappable keyboard shortcuts via `bindAction()` and `loadKeymap()`.

```ts
import { bindAction, loadKeymap } from 'markreview/keymap'
bindAction('accept', 'KeyZ')
console.log(loadKeymap())
```

## Versioning

MarkReview follows [Semantic Versioning](https://semver.org/). Major versions
align with the ProseMirror major series supported by the library. When a new
ProseMirror major is released, MarkReview increments its own major version. Minor
and patch releases deliver backwards‑compatible improvements and fixes.

