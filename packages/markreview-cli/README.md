# markreview-cli

Command line utilities to accept, reject, or strip CriticMarkup changes in Markdown files.

```
markreview <accept|reject|strip> <glob>
```

The command updates files in place. Exit code `0` indicates all markup was removed. If any files still contain CriticMarkup after processing, the command exits with code `1`.
