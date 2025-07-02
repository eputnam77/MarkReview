# MarkReview Documentation

Welcome to your central resource for installing, configuring, and mastering MarkReview. This documentation walks you through setup, integration, and customization, ensuring you get up and running with minimal friction.

## Quick Setup (About 5 Minutes)

* **Install the package:**

  ```bash
  pnpm install
  pnpm build
  ```
* **Integrate with your editor:**
Add the MarkReview bundle to any ProseMirror-based editor. You’ll be ready to review and track changes in minutes.

Need technical details? The [API reference](api/index.md) covers every module in depth.

> **Heads up:** The `server` and `collaboration` helpers included in the API are demo stubs—use them only for tests or exploration. For production use, replace these with your own implementations.

If you’re building for the browser, your bundler will detect the `browser` field and swap out any Node-only helpers with the provided `dist/empty.js` module, keeping your web app clean and lightweight.

## Key Features

* **Persistent Toolbar and Bar State:**
  The customizable toolbar and review bar remember their state across sessions with `setupToolbar()`.
* **Advanced Review Panel:**
  Search and filter chips—complete with live counters—keep document feedback organized and actionable.
* **Seamless Text Acceptance:**
  `persistMarks()` applies accepted suggestions directly into your ProseMirror documents.
* **Optimized Performance:**
  MarkReview is engineered to keep the bundle under 10 kB and DOM scan times under 5 ms, so your workflow stays fast.
