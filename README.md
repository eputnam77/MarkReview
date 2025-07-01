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

## Integration Notes

MarkReview marks its Node-only utilities under `src/node` and declares a
`browser` field in `package.json` to exclude them from browser bundles.
Ensure your bundler respects this field so those helpers stay out of the final
web build.

When bundling for the browser, modern tools read the `exports` map and use an
empty module for `markreview/node`. The repository ships `dist/empty.js` for this
purpose.

Two helper functions—`startDiffServer()` and `enableRealtimeCollaboration()`—are
only placeholders for tests and demos. They do **not** start a real service or
connect to any backend. Replace them with your own network logic when needed and
refer to the API docs for details.

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
- Format-change tracking and colourful change bars.
- Review panel with counters and keyboard navigation.
- Search and filter chips in the review panel keep conversations focused.
- Toolbar state saved to `localStorage`.
- Changes persist when saving ProseMirror documents via `persistMarks()`.
- Locale packs for quick translation.
- A performance gate checks bundle size and DOM scan time during CI.

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

Older releases shipped a Python-based documentation plugin and a separate CLI.
Both have been removed in favour of a single JavaScript library. Update any old
imports or scripts accordingly.
