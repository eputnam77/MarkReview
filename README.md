# MarkReview Monorepo

MarkReview equips any ProseMirror-based editor with fast, lightweight review tools. The library delivers CriticMarkup parsing, intuitive review UI components, and seamless integration for modern editorial workflows.

## Get Started

1. **Install and build MarkReview:**

   ```bash
   pnpm install
   pnpm build
   ```

2. **Integrate with your editor:**
   Import the MarkReview helpers and connect them to your ProseMirror instance:

   ```ts
   import { attach } from 'markreview'
   const controller = attach(editor)
   controller.acceptAll()
   ```

3. **Customize highlight colors:**
   Override default styles to match your theme:

   ```css
   :root {
     --markreview-add-color: #0044ff;
     --markreview-del-color: #d20f39;
   }
   ```

- For detailed setup, visit the [documentation](docs/index.md).
- See the [API reference](docs/api/index.md) for modules and helper functions.

## Integration Essentials

MarkReview ships as a pure front-end library with no server or real-time dependencies.

## Key Features

- One-call attachment to any ProseMirror editor.
- Comment threads and headless document diffing.
- Flexible, remappable keyboard shortcuts.
- Colorful change bars and format-change tracking.
- Review panel with live counters, keyboard navigation, search, and filter chips.
- Toolbar state persists via `localStorage`.
- Changes are saved with `persistMarks()`.
- Locale packs for instant translation.
- Built-in performance checks on bundle size and DOM scan time.
- Usability metrics validation via `validateUsabilityMetrics()`.

## Versioning

MarkReview follows [Semantic Versioning](https://semver.org/), with major releases tracking the ProseMirror version series.
