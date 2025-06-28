# Usage

Add the plugin to your project configuration and start your site.

## MkDocs

```yaml
# mkdocs.yml
plugins:
  - markreview
```

Start the dev server:

```bash
mkdocs serve
```

## Docusaurus

```js
// docusaurus.config.js
plugins: ['docusaurus-plugin-trackchanges'];
```
The plugin copies the runtime assets and injects the required tags automatically.
Start the dev server:

```bash
pnpm start
```

## Testing from Source

Create and activate a virtual environment in your site directory before installing so the dependencies stay isolated:

```bash
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

Install the plugins directly from this repository if a packaged release isn't available. Run these commands from the **MarkReview repository root** so the relative `packages/` paths resolve correctly. After installation, open your MkDocs or Docusaurus project in your IDE (e.g. VS Code) and enable the plugin in `mkdocs.yml` or `docusaurus.config.js`.

```bash
pip install -e packages/mkdocs-markreview
pnpm add -D file:packages/docusaurus-plugin-trackchanges
```

## Persisting Changes

Accepting or rejecting edits in the browser updates only the current page.
The source Markdown files remain unchanged. Use the CLI to apply the edits
and restart your dev server:

```bash
markreview accept docs/**/*.md
# now restart to reload the files
pnpm start
```
