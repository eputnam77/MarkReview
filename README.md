# MarkReview Monorepo

MarkReview adds lightweight review tools to any ProseMirror based editor. The library exposes utilities for parsing CriticMarkup and wiring a friendly review UI into your editor.

## Using MarkReview in Your Project

Install the package from source and import the helpers in your project.
```bash
pnpm install
pnpm build
```

You can override the highlight colours in your CSS:

```css
:root {
  --markreview-add-color: #0044ff;
  --markreview-del-color: #d20f39;
}
```

See the [docs](docs/index.md) for setup and usage instructions.
The [API reference](docs/api/index.md) covers the available modules and helper APIs.

## Features

- Attach to any ProseMirror editor with a single call:

```ts
import { attach } from 'markreview'
const controller = attach(editor)
controller.acceptAll()
```

- Comment threads stored with `CommentThread` helpers.
- Headless `diffDoc()` for simple comparisons.
- Remappable keyboard shortcuts via `bindAction()` and `loadKeymap()`.

```ts
import { bindAction, loadKeymap } from 'markreview/keymap'
bindAction('accept', 'KeyZ')
console.log(loadKeymap())
```

## Versioning

MarkReview follows [Semantic Versioning](https://semver.org/). Major versions
align with the ProseMirror major series supported by the library. When a new
ProseMirror major is released, MarkReview increments its own major version. Minor
and patch releases deliver backwards‑compatible improvements and fixes.

## Migrating from earlier versions

Older releases shipped a Python-based MkDocs plugin and a separate CLI. Both
have been removed in favour of a single JavaScript library. Update any old
imports or scripts accordingly.

