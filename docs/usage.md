# Usage

Add the plugin to your project configuration and start your site.

## MkDocs

```yaml
# mkdocs.yml
plugins:
  - marktrace
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
