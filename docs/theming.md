# Theming

MarkReview delivers a set of accessible, ready-to-use colors out of the box. You have full control to align the interface with your brand or project style. To customize colors, simply override the provided CSS variables in your theme:

```css
:root {
  --markreview-add-color: #0044ff;
  --markreview-del-color: #d20f39;
}
```

These variables define the appearance of insertions and deletions. For additional customization, you can adjust `--markreview-bar-color` for review highlights and `--markreview-highlight-bg` for background emphasis. This approach keeps your interface consistent and accessible while giving you the flexibility you need.
