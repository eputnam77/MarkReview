# ADR 0004: Comment System and User Attribution

## Context

The updated PRD and `TASKS.md` introduce interactive comments with threaded replies and visual author metadata.  The current codebase only highlights CriticMarkup comments with CSS; there is no structure for capturing author data or managing replies.  Upcoming features include keyboard shortcuts for adding and resolving comments and displaying Git attribution in the sidebar.

## Decision

- Implement a lightweight client-side comment manager within the new `markreview` package.  Comments are stored in an in-memory array and associated with change IDs.
- Each comment stores `id`, `changeId`, `content`, `author`, `timestamp`, `resolved` and `replies` as described in the PRD.
- The DOM will include a hidden comment box inside each change element.  Buttons allow adding replies and marking comments as resolved.
- User attribution information (name, avatar, timestamp) is rendered next to each change using metadata fields (`data-author`, `data-timestamp`).
- Integration packages (MkDocs, Docusaurus, editor plugins) will surface events like `comment-added` and `comment-resolved` so external tools can sync state or display sidebars.

## Consequences

- Enables basic review workflows without a server component; comments persist only for the current session unless callers provide storage hooks.
- The architecture remains front-end only, allowing later extensions (e.g. WebSocket collaboration) without breaking compatibility.
- Existing CSS and JS assets must be refactored into the new library to expose the comment manager and attribution components.
