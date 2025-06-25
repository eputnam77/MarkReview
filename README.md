# MarkTrace Monorepo

This repository contains plugins for MkDocs and Docusaurus plus a CLI for processing CriticMarkup changes.

## Using MarkTrace in Your Project

Install the plugin for your static site generator and enable it in your configuration.

```bash
pip install mkdocs-marktrace
pnpm add -D docusaurus-plugin-trackchanges
```

### MkDocs

Add the plugin name to the `plugins` section of your `mkdocs.yml`:

```yaml
# mkdocs.yml
plugins:
  - marktrace
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
Use the `marktrace` CLI to apply changes and restart the dev server.

You can override the highlight colours in your CSS:

```css
:root {
  --mt-insert-color: #0044ff;
  --mt-delete-color: #d20f39;
}
```

The plugin automatically injects the runtime assets so tracked changes appear without manual imports.

Run the CLI tests with:

```bash
pnpm --filter marktrace-cli run test
```

See the [docs](docs/index.md) for setup and usage instructions.
