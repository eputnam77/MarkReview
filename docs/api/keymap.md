# keymap utilities

The keymap module provides small helpers to remap keyboard shortcuts.

## `bindAction(action, code)`

Assign a new `KeyboardEvent.code` to an action. Built in actions are `accept`, `reject` and `comment`.

## `loadKeymap()`

Returns the current mapping as an object.

## `openPreferencesDialog()`

Stub that would open a settings modal; returns `true` so tests can confirm it ran.

