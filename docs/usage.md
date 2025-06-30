# Usage

Add the plugin to your project configuration and start your site.

## MkDocs

```yaml
# mkdocs.yml
plugins:
  - mkdocs_markreview
```

Start the dev server:

```bash
mkdocs serve
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

Install the plugin directly from this repository if a packaged release isn't available:

```bash
pip install -e .
```
After installation, enable the plugin in `mkdocs.yml`.

## Persisting Changes

Accepting or rejecting edits in the browser updates only the current page.
The source Markdown files remain unchanged. Use the CLI to apply the edits
and restart your dev server:

```bash
markreview accept docs/**/*.md
# now restart to reload the files
pnpm start
```
