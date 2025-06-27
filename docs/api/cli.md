# markreview-cli

The CLI processes CriticMarkup in Markdown files.

```bash
markreview <accept|reject|strip> <glob>
```

Files are modified in place. The exit code is `0` when all markup was removed,
`1` if any edits remain or `2` on usage errors.

The helper `pandiff.js` exports `runPandiff(oldFile, newFile)` for optional
version comparisons.
