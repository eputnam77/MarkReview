# ADR 0002: Change Bar Implementation Strategy

## Context

The PRD specifies adaptive vertical change-bars highlighting blocks with edits. `TASKS.md` further requires bars to reflect the highest priority change, support custom width and style via CSS variables, and collapse long sequences.

Current implementation adds a `markreview-block` class via JavaScript when an edit (`ins`, `del`, `mark`, `.critic`) is found. The class applies a fixed `border-left` in CSS. There is no support yet for width/style variables, offset handling or auto-collapse logic.

## Decision

The initial MVP uses a light-weight approach:

- JavaScript scans the DOM on load and adds `markreview-block` to parent elements of edits.
- CSS uses `border-left: 3px solid var(--markreview-bar-color)` to render a bar.
- A toggle widget switches between Original, Markup and Accepted views.

Future work (tracked in `TASKS.md`) will refine this by calculating the highest priority change per block, exposing `--mr-bar-width`, `--mr-bar-style` and `--mr-bar-offset` variables and collapsing lengthy sequences as described in the PRD.

## Consequences

- The existing assets meet basic visual requirements but do not yet satisfy the full specification.
- Performance impact is minimal as the scan only queries common block elements.
- Additional features will build on top of this foundation without major restructuring.
