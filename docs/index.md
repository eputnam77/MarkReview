# MarkReview Documentation

Welcome to the MarkReview docs. These pages cover setup, usage and customisation for the core library.

## Quick Setup (≈5 minutes)

1. Install the package:
   ```bash
   pnpm install
   pnpm build
   ```
2. Include the bundle in your ProseMirror-based editor.

See the [API reference](api/index.md) for detailed module documentation.

## Key Features

- Toolbar view and bar state persist across sessions using `setupToolbar()`.
- The review panel provides search and filter chips with live counters.
- `persistMarks()` saves accepted text back into your ProseMirror documents.
- A performance check keeps the bundle under 10 kB and DOM scan under 5 ms.
