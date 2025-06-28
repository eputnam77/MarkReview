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

Install the plugins directly from this repository if a packaged release isn't available:
Run these commands from the MarkReview repository root so the relative `packages/` paths resolve correctly.

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
