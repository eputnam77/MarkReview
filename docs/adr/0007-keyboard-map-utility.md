# ADR 0007: Keyboard Map Utility for International Layouts

## Context

The PRD (requirements F-11) and corresponding tasks specify resilient keyboard shortcuts across QWERTY, AZERTY and QWERTZ layouts. Shortcuts must rely on `event.code` and allow users to remap keys in a preferences dialog. Playwright tests validate the default mappings.

## Decision

- Implement a `keymap` module under `src/keymap` exposing `bindAction(action, defaultCode)` and `loadKeymap()` helpers.
- Default bindings use physical `event.code` values for `a`, `r` and `c` but are stored in `localStorage` so users can override them.
- A small settings UI writes the chosen codes to storage and updates the runtime map without page reloads.
- Playwright tests will execute under different keyboard layouts to ensure no failures.

## Consequences

- All keyboard handling flows through the keymap module making it easy to extend.
- Custom layouts persist per browser profile via localStorage.
- Future collaboration features can share the keymap state without redesign.
