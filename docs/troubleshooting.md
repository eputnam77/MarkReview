# Troubleshooting

## Plugin not loading

Ensure the package is installed and listed under `plugins` in your config file. Restart the dev server after installing.

## Styles not applied

The Docusaurus plugin automatically injects the CSS and JS. If styles are missing, ensure your theme doesn't override them. Custom themes may need to import the CSS manually.

## Edits not persisted

Keyboard shortcuts only modify the live page. Run the `markreview` CLI on your Markdown files and restart the dev server to see the changes.

## Installation errors

The error `packages/mkdocs-markreview is not a valid editable requirement` usually means you ran the install command outside the repository root.
Activate your virtual environment first, then rerun the commands from the **MarkReview repository root** so the relative paths resolve.
