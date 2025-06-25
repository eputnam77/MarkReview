# mkdocs-marktrace

This plugin injects the same change-tracking assets used by the Docusaurus plugin. Added text appears in blue, deletions in red, and changed blocks receive a 3‑px bar. Substitutions, comments and highlights are also styled so the full CriticMarkup syntax renders correctly. Colours meet WCAG&nbsp;AA contrast requirements. A floating selector lets readers toggle between **Original**, **Markup**, and **Accepted** views with the choice saved to `localStorage`. Press `m` to cycle the view, `a` to accept the edit under the cursor, and `r` to reject it.

Browser accept/reject only alters the displayed page. Run the `marktrace` CLI to update your Markdown files and restart MkDocs to apply the changes.
