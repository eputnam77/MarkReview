# Troubleshooting

## Script not loading

Ensure the package is installed and included in your build output. Restart your dev server after installing.

## Styles not applied

If styles are missing, make sure your theme imports `styles.css` from the package. Custom setups may need to include the CSS manually.

## Edits not persisted

When editing Markdown you may still see CriticMarkup tags after accepting or rejecting changes. Run `persistMarks()` on the file before committing. Text entered in a ProseMirror editor is persisted automatically.

## Installation errors

If the package fails to install, double-check that you're running the command inside the repository root and that your package manager is up to date.
