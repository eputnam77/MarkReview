# Troubleshooting

When issues arise, a quick check of the essentials will get you back on track.

## Script Not Loading

* Confirm the package is installed and included in your build process.
* After installation, restart your development server to apply changes.

## Styles Not Applied

* If you’re missing visual styling, verify that your theme imports `styles.css` from the MarkReview package.
* For custom setups, you may need to import the CSS manually.

## Edits Not Persisted

* Still seeing CriticMarkup tags in Markdown after accepting or rejecting changes?
  Run `persistMarks()` on your file before committing.
* All edits in a ProseMirror editor are saved automatically.

## Installation Errors

* If installation fails, make sure you’re working in the repository root.
* Double-check that your package manager is up to date before retrying.
