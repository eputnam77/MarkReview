# MarkReview Monorepo

This repository contains plugins for MkDocs and Docusaurus plus a CLI for processing CriticMarkup changes.

## Using MarkReview in Your Project

Install the plugin for your static site generator and enable it in your configuration.
For isolated testing, create and activate a virtual environment in your site project
(for example with `python -m venv .venv` and `source .venv/bin/activate` on
macOS/Linux or `.venv\Scripts\activate` on Windows). Run the installation
commands from the **MarkReview repository root** so the relative `packages/`
paths resolve correctly.

```bash
pip install mkdocs-markreview
pnpm add -D docusaurus-plugin-trackchanges
```

If the packages haven't been published yet, install them directly from this repository to test locally:
Run these commands from the MarkReview repository root so the relative `packages/` paths resolve correctly.

```bash
pip install -e packages/mkdocs-markreview
pnpm add -D file:packages/docusaurus-plugin-trackchanges
```
After installing, open your MkDocs or Docusaurus project in your IDE (for example VS Code)
and list the plugin in `mkdocs.yml` or `docusaurus.config.js`.

### MkDocs

Add the plugin name to the `plugins` section of your `mkdocs.yml`:

```yaml
# mkdocs.yml
plugins:
  - markreview
```

Start your site with `mkdocs serve`.

### Docusaurus

Enable the plugin in `docusaurus.config.js`:

```js
// docusaurus.config.js
plugins: ['docusaurus-plugin-trackchanges'];
```

Run `pnpm start` (or `npm start`) to view your site.

**Accepting or rejecting edits in the browser does not modify your source files.**
Use the `markreview` CLI to apply changes and restart the dev server.

You can override the highlight colours in your CSS:

```css
:root {
  --markreview-add-color: #0044ff;
  --markreview-del-color: #d20f39;
}
```

The plugin automatically injects the runtime assets so tracked changes appear without manual imports.

Run the CLI tests with:

```bash
pnpm --filter markreview-cli run test
```

See the [docs](docs/index.md) for setup and usage instructions.
The [API reference](docs/api/index.md) describes the CLI and plugin modules.

## Versioning

MarkReview follows [Semantic Versioning](https://semver.org/). Major versions
align with the ProseMirror major series supported by the library. When a new
ProseMirror major is released, MarkReview increments its own major version. Minor
and patch releases deliver backwards‑compatible improvements and fixes.

