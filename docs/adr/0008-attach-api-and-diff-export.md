# ADR 0008: Generic Attach API and Headless Diff Export

## Context

TASKS.md outlines a requirement for a public `MarkReview.attach()` method that mounts the library on any ProseMirror ≥1.23 editor. A related utility `diffDoc(oldDoc, newDoc)` must return a structured diff without DOM usage so external tools can process revisions.

## Decision

- Expose `attach(editor: Editor, options: AttachOptions)` from `src/index.ts`. The function returns a controller object exposing accept/reject/comment operations.
- The core logic does not depend on a particular framework; adapters translate editor events and commands.
- Provide `diffDoc(oldDoc, newDoc)` under `src/diff-headless` that compares two ProseMirror JSON documents and emits change objects compatible with the UI modules.
- Example adapters in `src/adapters` will call `attach()` and pass in framework-specific callbacks.

## Consequences

- Editors integrate via thin adapters keeping the library framework‑agnostic.
- Headless diff export enables future services (e.g., hosted diff API) without rewriting core logic.
- Unit tests can target the diff functions directly, improving coverage.
