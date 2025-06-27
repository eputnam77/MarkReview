# mkdocs-markreview

`MarkReviewPlugin` ensures `pymdownx.critic` is enabled, injects runtime assets
and copies them into the site directory on build. Helper modules provide
placeholders for upcoming features:

- `changebars.apply_change_bars(html)` – marks pages containing edits
- `keybindings.activate_keybindings()` – registers browser shortcuts
- `obsidian.explore_obsidian_support()` – probe for Obsidian integration
