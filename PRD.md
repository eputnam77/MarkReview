### **Product Requirements Document — *MarkReview***

(Track‐changes and change bars for Markdown in any documentation platform)

---

## 0. Executive Summary

*MarkReview* adds Word‑style **track‑changes** — colour‑coded insertions, deletions, substitutions, comments **and vertical change‑bars next to edited lines/blocks** — to any documentation platform that supports JavaScript. It leverages the human‑readable **\[CriticMarkup]¹** syntax, existing parsers, and a lightweight slice of CSS + JS + CLI utilities. Installation is a one‑liner via **npm**.

---

## 1. Problem Statement & Goals

| ID  | Problem                                                                   | Goal                                                                                    |
| --- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| P‑1 | Reviewers forced back to Word/Google Docs to visualise edits.             | Render clear inline diffs *inside* the docs site — incl. change‑bars for fast scanning. |
| P‑2 | Git diffs are noisy; no "accept/reject" in rendered view.                 | Offer **Original∕Markup∕Accepted** toggles & one‑click merge/strip.                     |
| P‑3 | Current CriticMarkup parsers expose raw `<ins>/<del>` without UI or bars. | Add vertical bars, colour themes, keyboard shortcuts, toolbar.                          |
| P‑4 | Authors need a painless way to strip edits before release.                | Provide CLI & CI hooks (`markreview accept/reject`).                                     |

---

## 2. Personas & Key User Stories

1. **Technical Writer** — "I push a branch; the preview highlights edits *and* shows a bar so the SME can skim."
2. **SME Reviewer** — "I toggle *Original* view to read fluidly, then switch back to *Markup* to comment."
3. **Doc Lead / CI** — "Before publishing, my pipeline runs `markreview accept` so the public site is squeaky‑clean."

---

## 3. Scope

| Phase                  | Platforms                                    | Features                                                                                                                 |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Phase 1 (MVP)**      | Any platform with JavaScript support         | CriticMarkup parsing, coloured `<ins>/<del>`, **adaptive change‑bars**, mode toggle, CLI accept/reject, **user attribution, comment system**, WCAG‑AA theming. |
| **Phase 2 ("Growth")** | Same + rich text editors (TipTap, Toast UI)  | **Change suggestions, change history, bulk operations**, sidebar comments, Git attribution, bulk *Review* dashboard, VS Code extension. |
| **Phase 3 ("Collab")** | Live editors (Nextra, Next‑MDX)              | **Real-time multi‑user suggestions & presence indicators, collaborative review workflows, change conflict resolution.** |

---

## 4. Functional Requirements

| ID      | Requirement                                                                                                                                                                                                                                                                                                                            | Priority |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F‑1     | Full CriticMarkup syntax: additions `{++ ++}`, deletions `{-- --}`, substitutions `{~~a~>b~~}`, comments `{>> <<}`, highlights `{== ==}`.                                                                                                                                                                                              | Must     |
| F‑2     | Render colours: **blue underline for additions**, **red strike for deletions**; configurable via CSS custom properties.                                                                                                                                                                                                                | Must     |
| **F‑3** | **Generate a 2–3 px vertical change‑bar along the inline‑start edge of any block containing at least one `<ins>`/`<del>`/`<span class="cm‑change">` node.** Bar colour follows highest‑priority change inside block (blue = add, red = delete, purple = substitute). Users may override width, colour, or "dotted" style via CSS vars. | Must     |
| F‑4     | Floating pill‑switch: *Original∕Markup∕Accepted* with local‑storage persistence.                                                                                                                                                                                                                                                       | Must     |
| **F‑5** | **Inline accept/reject buttons: Each change displays a small "✓ Accept" / "✗ Reject" button on hover/focus. Clicking removes the CriticMarkup syntax and updates the DOM immediately.**                                                                                                                                                | Must     |
| **F‑6** | **Change bar toggle: Floating toolbar with "Show/Hide Change Bars" button to toggle `--mr-bars-visible` CSS variable.**                                                                                                                                                                                                                | Must     |
| **F‑7** | **User attribution: Display author information for each change with configurable user metadata (name, avatar, timestamp).**                                                                                                                                                                                                             | Must     |
| **F‑8** | **Comment system: Inline comment boxes that appear on hover/focus for each change, with threaded replies and resolution status.**                                                                                                                                                                                                       | Must     |
| **F‑9** | **Change suggestions: Support for `{~~original~>suggestion~~}` syntax where suggestions can be accepted/rejected independently of the original content.**                                                                                                                                                                               | Should   |
| **F‑10** | **Change history: Maintain a complete audit trail of all changes with timestamps, authors, and action history (accept/reject).**                                                                                                                                                                                                        | Should   |
| **F‑11** | **Bulk operations: Select multiple changes and accept/reject them as a group with keyboard shortcuts (Shift+click, Ctrl+A for all).**                                                                                                                                                                                                   | Should   |
| **F‑12** | **Export functionality: Download changes and comments as PDF, CSV, or JSON reports with detailed attribution ("x was changed to y by {user} on {date}").**                                                                                                                                                                               | Should   |
| F‑13    | Node CLI `markreview accept <glob>` / `reject` / `strip` with exit codes for CI.                                                                                                                                                                                                                                                        | Should   |
| F‑14    | Keybindings (Phase 2): `a` = accept under cursor, `r` = reject, `m` = toggle mode, `b` = toggle bars.                                                                                                                                                                                                                                 | Should   |
| F‑15    | A11y: bars include `aria-hidden="true"`, edits labelled, contrast ≥ 4.5∶1 under both light/dark.                                                                                                                                                                                                                                       | Must     |
| F‑16    | Performance: added assets ≤ 8 KiB JS + 5 KiB CSS (gzip); DOM scan completes < 5 ms on 2 MB page.                                                                                                                                                                                                                                       | Must     |
| F‑17    | npm package `markreview` ships with `package.json` as single source of truth; supports both CommonJS and ES modules.                                                                                                                                                                                                                   | Must     |

---

## 5. Non‑Functional Requirements

* **SemVer + Compatibility** — major bumps follow platform majors.
* **Security** — CSP‑safe; no `eval`; CLI sanitises paths.
* **Documentation** — "Getting‑started in 5 min", theming cookbook, troubleshooting FAQ.
* **Code Quality** — ESLint + Prettier + TypeScript gate CI; min 90 % unit‑test coverage.

---

## 6. System Architecture

```mermaid
graph TD
  subgraph Build‑time
    A[.md w/ CriticMarkup] -->|Any Parser| B[HTML with CriticMarkup]
    C[Rich Text w/ CriticMarkup] -->|Editor Export| D[HTML with CriticMarkup]
  end
  subgraph Runtime (Browser)
    B & D --> E[MarkReview JS]\n(scan DOM ‑> add `.mr‑changed` class)
    E --> F[CSS ::before pseudo‑element = change‑bar]
    E --> G[Inline Accept/Reject Buttons]
    E --> H[Floating Toolbar]
    G --> I[DOM Update: Remove CriticMarkup]
    H --> J[Toggle Change Bars CSS Var]
  end
  CLI[[markreview‑cli]] -. accept/reject .-> A & C
```

* **Change‑bar algorithm (JS)**

  1. Query `document.querySelectorAll('ins, del, span.cm-change')`.
  2. For each, ascend to nearest block element (`<p>,<li>,<td>,<th>,<h*>`).
  3. Add class `mr‑changed--add|del|subst` to parent.
  4. De‑duplicate via `WeakSet` to avoid multi‑bar.

* **Accept/Reject UI (JS)**

  1. For each change element, inject accept/reject buttons on hover/focus.
  2. Accept: Remove CriticMarkup syntax, keep final content, update DOM.
  3. Reject: Remove CriticMarkup syntax, keep original content, update DOM.
  4. Re-scan DOM after each action to update change bars.

* **CSS snippet**

```css
.mr‑changed { position: relative; }
.mr‑changed::before {
  content: "";
  position: absolute;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: -0.5rem; /* keeps layout stable */
  width: var(--mr-bar-width, 3px);
  background: var(--mr-bar-colour, red);
  opacity: var(--mr-bars-visible, 1); /* toggle visibility */
}
.mr‑changed--add::before   { --mr-bar-colour: var(--mr-col-add, #007aff); }
.mr‑changed--del::before   { --mr-bar-colour: var(--mr-col-del, #d83b01); }
.mr‑changed--subst::before { --mr-bar-colour: var(--mr-col-subst, #8856d8); }

/* Accept/Reject buttons */
.mr-change-controls {
  position: absolute;
  top: 0;
  right: -2rem;
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s;
}
.mr-change:hover .mr-change-controls,
.mr-change:focus-within .mr-change-controls {
  opacity: 1;
}
```

---

## 7. Folder / Repo Structure

```
markreview/
├─ src/
│  ├─ index.ts          ⚑ main entry point
│  ├─ markreview.ts     ⚑ change‑bar logic
│  ├─ markreview.css    ⚑ styles incl. bars
│  ├─ cli.ts            ⚑ CLI implementation
│  └─ types.ts          ⚑ TypeScript definitions
├─ dist/                ⚑ built files
├─ examples/
│  ├─ basic-html/
│  ├─ tiptap-editor/
│  ├─ toast-ui-editor/
│  └─ docusaurus-demo/
├─ package.json
├─ tsconfig.json
├─ README.md
└─ …
```

---

## 8. Implementation Timeline (Phase 1)

| Week | Deliverable                                                            | Owner     |
| ---- | ---------------------------------------------------------------------- | --------- |
| 1    | Initialise npm package; PoC CriticMarkup render in basic HTML.         | Core      |
| 2    | **Implement change‑bar CSS + DOM scanner (incl. a11y).**               | Front‑end |
| 3    | **Inline accept/reject buttons with hover/focus triggers.**             | Front‑end |
| 4    | **Floating toolbar with change bar toggle and mode switch.**           | Front‑end |
| 5    | **User attribution system with metadata display.**                     | Front‑end |
| 6    | **Comment system with inline comment boxes and threaded replies.**      | Front‑end |
| 7    | TypeScript definitions and ES module support.                          | Core      |
| 8    | Node CLI (`accept/reject/strip`) with unit tests (Vitest).             | Tooling   |
| 9    | Integration tests: basic HTML, TipTap, Toast UI examples.              | QA        |
| 10   | Accessibility audit, performance profiling (< 5 ms scan).              | QA        |
| 11   | Beta 0.1.0 → npm; collect feedback.                                    | PM        |
| 12   | Bug‑fix sprint; write theming & migration guides.                      | All       |
| 13   | **Phase 1 GA** v1.0.0; announce on Dev.to, Reddit, & relevant forums.  | PM        |

**Phase 2 Timeline (Growth):**
| Week | Deliverable                                                            | Owner     |
| ---- | ---------------------------------------------------------------------- | --------- |
| 14   | **Change suggestions system with multiple suggestions per change.**     | Front‑end |
| 15   | **Change history and audit trail implementation.**                     | Backend   |
| 16   | **Bulk operations interface with multi-select capabilities.**          | Front‑end |
| 17   | **Enhanced keyboard shortcuts and power user features.**               | Front‑end |
| 18   | **Sidebar comments and Git attribution integration.**                  | Front‑end |
| 19   | **VS Code extension development.**                                     | Tooling   |
| 20   | **Bulk Review dashboard for managing large change sets.**              | Front‑end |
| 21   | **Phase 2 GA** v2.0.0; comprehensive testing and documentation.       | All       |

**Phase 3 Timeline (Collaboration):**
| Week | Deliverable                                                            | Owner     |
| ---- | ---------------------------------------------------------------------- | --------- |
| 22   | **Real-time presence indicators and user activity tracking.**          | Backend   |
| 23   | **WebSocket-based collaboration server implementation.**               | Backend   |
| 24   | **Conflict detection and resolution system.**                          | Backend   |
| 25   | **Collaborative review workflows and approval chains.**                | Front‑end |
| 26   | **Performance optimization for real-time collaboration.**              | Backend   |
| 27   | **Phase 3 GA** v3.0.0; enterprise collaboration features.             | All       |

---

## 9. Risks & Mitigations

| Risk                                         | Likelihood | Impact | Mitigation                                                                 |
| -------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------- |
| Bars overlap with left‑aligned callouts/ads. | Medium     | Medium | Provide `--mr-bar-offset` var; auto‑detect `aside, .admonition` and shift. |
| Extra DOM scan on huge pages (> 20 k nodes). | Low        | Low    | Throttle scan via `requestIdleCallback`; skip if `data-mr-skip`.           |
| CSS clashes with theme variables.            | Medium     | Medium | Prefix `.mr-*`, isolate vars, test top themes.                             |

---

## 10. Success Metrics

* **Usability score for change‑bar visibility ≥ 95 %** in hallway tests
* **Performance target**: DOM scan completes < 5 ms on 2 MB page
* **Bundle size**: ≤ 8 KiB JS + 5 KiB CSS (gzip)
* **Accessibility**: WCAG-AA compliance with contrast ≥ 4.5∶1

---

## 11. Technical Decisions

| Question                                          | Final Decision                                                                                                                                                                            | Notes                                                                                                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Bar colour: first or highest‑priority change?** | **Highest‑priority change wins (default: deletion > substitution > addition).**                                                                                                           | Gives reviewers an at‑a‑glance sense of *impact*. Rule can be overridden via `--mr-bar-colour-mode="first"` in plugin config.                          |
| **Expose dotted vs solid bar style?**             | **Surface as a CSS custom property (`--mr-bar-style`) in Phase 1; UI toggle deferred to Phase 2.**                                                                                        | Keeps bundle small while letting theme authors opt‑in: `--mr-bar-style: dotted 2px`. A toolbar button can be added alongside keybindings later.        |
| **Auto‑collapse long sequences of bars?**         | **Yes — ship a heuristic in Phase 1.** If ≥ 10 consecutive change‑bars span > 30 % of viewport height, MarkReview collapses them into a single bar with a clickable "▼ expand" affordance. | Prevents visual overload on large deletions while preserving detail on demand. Thresholds configurable (`mr-collapse-threshold`, `mr-collapse-ratio`). |

These decisions are now locked into v1.0 and reflected in updated Functional Requirements (F‑3, F‑8) and implementation tasks.

---

## 12. UI Components for Web-Embedded Editors

### Floating Toolbar
A persistent toolbar that appears in the top-right corner of the viewport:

```html
<div class="mr-toolbar">
  <button class="mr-mode-toggle" title="Toggle view mode">
    <span class="mr-mode-label">Markup</span>
  </button>
  <button class="mr-bars-toggle" title="Show/hide change bars">
    <span class="mr-bars-icon">📊</span>
  </button>
</div>
```

**Behavior:**
- **Mode Toggle**: Cycles through Original → Markup → Accepted
- **Bars Toggle**: Sets `--mr-bars-visible: 0/1` CSS variable
- **Persistence**: Saves state to `localStorage.mr-settings`

### Inline Accept/Reject Controls
Small buttons that appear on hover/focus for each change:

```html
<span class="mr-change mr-change--add">
  <span class="mr-content">new content</span>
  <div class="mr-change-controls">
    <button class="mr-accept" title="Accept change">✓</button>
    <button class="mr-reject" title="Reject change">✗</button>
  </div>
</span>
```

**Behavior:**
- **Accept**: Removes CriticMarkup syntax, keeps final content
- **Reject**: Removes CriticMarkup syntax, keeps original content
- **DOM Update**: Immediately updates the document and re-scans for change bars
- **Undo**: Provides undo stack for accept/reject actions (Phase 2)

### Keyboard Shortcuts
Global shortcuts for power users:

| Key | Action | Description |
|-----|--------|-------------|
| `a` | Accept | Accept change under cursor |
| `r` | Reject | Reject change under cursor |
| `m` | Mode | Toggle view mode |
| `c` | Comment | Add comment to change under cursor |
| `r` | Reply | Reply to focused comment |
| `Ctrl+Enter` | Submit | Submit comment/reply |
| `Esc` | Cancel | Cancel comment input |
| `Ctrl+R` | Resolve | Resolve focused comment |

### Comment Data Structure
```javascript
const commentData = {
  comments: [
    {
      id: 'comment-123',
      changeId: 'change-456',
      content: 'This change improves clarity.',
      author: {
        id: 'user-123',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg'
      },
      timestamp: '2024-01-01T10:00:00Z',
      resolved: false,
      replies: [
        {
          id: 'reply-789',
          content: 'Agreed, this is much clearer.',
          author: {
            id: 'user-456',
            name: 'Jane Smith',
            avatar: 'https://example.com/jane-avatar.jpg'
          },
          timestamp: '2024-01-01T11:00:00Z'
        }
      ]
    }
  ]
};
```

---

## 13. Phase 1 Comment System Implementation

### Inline Comment Boxes
Comment boxes that appear on hover/focus for each change, similar to CKEditor's review interface:

```html
<span class="mr-change mr-change--add" data-author="john.doe" data-timestamp="2024-01-01T10:00:00Z">
  <span class="mr-content">new content</span>
  <div class="mr-change-meta">
    <span class="mr-author">John Doe</span>
    <span class="mr-timestamp">2 hours ago</span>
  </div>
  <div class="mr-change-controls">
    <button class="mr-accept" title="Accept change">✓</button>
    <button class="mr-reject" title="Reject change">✗</button>
    <button class="mr-comment" title="Add comment">💬</button>
  </div>
  <div class="mr-comment-box" style="display: none;">
    <div class="mr-comment-header">
      <span class="mr-comment-author">John Doe</span>
      <span class="mr-comment-time">2 hours ago</span>
      <button class="mr-comment-resolve" title="Resolve comment">✓</button>
    </div>
    <div class="mr-comment-content">
      <p>This change improves clarity and follows our style guide.</p>
    </div>
    <div class="mr-comment-replies">
      <div class="mr-reply">
        <span class="mr-reply-author">Jane Smith</span>
        <span class="mr-reply-time">1 hour ago</span>
        <p>Agreed, this is much clearer.</p>
      </div>
    </div>
    <div class="mr-comment-input">
      <textarea placeholder="Add a reply..."></textarea>
      <button class="mr-reply-submit">Reply</button>
    </div>
  </div>
</span>
```

### Comment System Features

#### 1. **Threaded Replies**
- Each comment can have multiple replies
- Nested conversation threads
- Author attribution for each reply
- Timestamp tracking

#### 2. **Resolution Status**
- Comments can be marked as "resolved"
- Visual indicators for resolved vs. active comments
- Bulk resolve options

#### 3. **Comment Actions**
```javascript
const commentSystem = {
  addComment(changeId, content, author) {
    const comment = {
      id: generateId(),
      changeId,
      content,
      author,
      timestamp: new Date(),
      resolved: false,
      replies: []
    };
    this.comments.push(comment);
    this.renderComment(comment);
  },
  
  addReply(commentId, content, author) {
    const reply = {
      id: generateId(),
      content,
      author,
      timestamp: new Date()
    };
    const comment = this.comments.find(c => c.id === commentId);
    comment.replies.push(reply);
    this.renderReply(reply, commentId);
  },
  
  resolveComment(commentId) {
    const comment = this.comments.find(c => c.id === commentId);
    comment.resolved = true;
    this.updateCommentUI(commentId);
  }
};
```

### User Attribution System

#### 1. **Author Metadata**
```javascript
const userSystem = {
  currentUser: {
    id: 'user-123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar.jpg',
    role: 'reviewer'
  },
  
  getUserInfo(userId) {
    return this.users.find(u => u.id === userId) || {
      name: 'Unknown User',
      avatar: '/default-avatar.png'
    };
  }
};
```

#### 2. **Visual Attribution**
```css
.mr-change-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--mr-meta-color, #666);
  margin-bottom: 0.25rem;
}

.mr-author {
  font-weight: 500;
  color: var(--mr-author-color, #333);
}

.mr-author-avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.mr-timestamp {
  font-size: 0.75rem;
  opacity: 0.8;
}
```

### Integration with Editor Frameworks

#### TipTap Integration with Comments
```javascript
import { MarkReview } from 'markreview';

const editor = new Editor({
  // ... TipTap config
});

// Initialize MarkReview with comment support
MarkReview.init({
  target: editor.view.dom,
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true,
    maxReplies: 10
  },
  users: {
    current: {
      id: 'user-123',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg'
    }
  }
});

// Handle comment events
MarkReview.on('comment-added', (changeId, comment) => {
  // Sync with editor state
  editor.emit('markreview-comment-added', { changeId, comment });
});

MarkReview.on('comment-resolved', (commentId) => {
  // Update comment status
  editor.emit('markreview-comment-resolved', { commentId });
});
```

#### Toast UI Editor Integration
```javascript
const editor = new toastui.Editor({
  // ... Toast UI config
});

editor.on('load', () => {
  MarkReview.init({
    target: editor.getEditorElement(),
    mode: 'markup',
    showBars: true,
    comments: {
      enabled: true,
      allowReplies: true,
      allowResolution: true
    }
  });
});
```

### Keyboard Shortcuts for Comments
| Key | Action | Description |
|-----|--------|-------------|
| `c` | Comment | Add comment to change under cursor |
| `r` | Reply | Reply to focused comment |
| `Ctrl+Enter` | Submit | Submit comment/reply |
| `Esc` | Cancel | Cancel comment input |
| `Ctrl+R` | Resolve | Resolve focused comment |

### Comment Data Structure
```javascript
const commentData = {
  comments: [
    {
      id: 'comment-123',
      changeId: 'change-456',
      content: 'This change improves clarity.',
      author: {
        id: 'user-123',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg'
      },
      timestamp: '2024-01-01T10:00:00Z',
      resolved: false,
      replies: [
        {
          id: 'reply-789',
          content: 'Agreed, this is much clearer.',
          author: {
            id: 'user-456',
            name: 'Jane Smith',
            avatar: 'https://example.com/jane-avatar.jpg'
          },
          timestamp: '2024-01-01T11:00:00Z'
        }
      ]
    }
  ]
};
```

---

## 14. Integration Guides

### TipTap Integration Guide

#### Basic Setup
```javascript
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { MarkReview } from 'markreview';

// Initialize TipTap editor
const editor = new Editor({
  element: document.querySelector('.editor'),
  extensions: [
    StarterKit,
    // Add your custom extensions
  ],
  content: '<p>Your content with {++CriticMarkup++} syntax</p>',
  onUpdate: ({ editor }) => {
    // Handle content updates
  }
});

// Initialize MarkReview after editor is ready
MarkReview.init({
  target: editor.view.dom,
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true
  },
  users: {
    current: {
      id: 'user-123',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg'
    }
  }
});
```

#### Advanced Configuration
```javascript
// Custom MarkReview configuration for TipTap
const markReviewConfig = {
  target: editor.view.dom,
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true,
    maxReplies: 10,
    autoResolve: false
  },
  users: {
    current: {
      id: 'user-123',
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg',
      role: 'reviewer'
    }
  },
  // TipTap-specific options
  tiptap: {
    syncContent: true,
    preserveSelection: true,
    updateOnChange: true
  }
};

MarkReview.init(markReviewConfig);
```

#### Event Handling
```javascript
// Handle MarkReview events in TipTap
MarkReview.on('change-accepted', (changeElement, originalContent, finalContent) => {
  // Update TipTap content
  editor.commands.setContent(finalContent);
});

MarkReview.on('change-rejected', (changeElement, originalContent, finalContent) => {
  // Update TipTap content
  editor.commands.setContent(originalContent);
});

MarkReview.on('comment-added', (changeId, comment) => {
  // Sync comment with TipTap state
  editor.emit('markreview-comment-added', { changeId, comment });
});

// Listen for TipTap events
editor.on('update', ({ editor }) => {
  // Re-scan for CriticMarkup when content changes
  MarkReview.scan();
});
```

### Milkdown Integration Guide

#### Basic Setup
```javascript
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/preset-commonmark';
import { MarkReview } from 'markreview';

// Initialize Milkdown editor
const editor = await Editor.make()
  .config((ctx) => {
    ctx.set(rootCtx, document.querySelector('.editor'));
    ctx.set(defaultValueCtx, '# Your content with {++CriticMarkup++} syntax');
  })
  .use(nord)
  .use(commonmark)
  .create();

// Initialize MarkReview after Milkdown is ready
MarkReview.init({
  target: editor.dom,
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true
  }
});
```

#### Milkdown-Specific Configuration
```javascript
// Custom configuration for Milkdown
const markReviewConfig = {
  target: editor.dom,
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true
  },
  // Milkdown-specific options
  milkdown: {
    syncMarkdown: true,
    preserveFormatting: true,
    updateOnRender: true
  }
};

MarkReview.init(markReviewConfig);
```

#### Content Synchronization
```javascript
// Handle content changes in Milkdown
editor.action((ctx) => {
  ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
    // Re-scan for CriticMarkup when markdown changes
    MarkReview.scan();
  });
});

// Handle MarkReview changes
MarkReview.on('change-accepted', (changeElement, originalContent, finalContent) => {
  // Update Milkdown content
  editor.action((ctx) => {
    ctx.get(commandsCtx).call(updateValue.key, finalContent);
  });
});
```

### Toast UI Editor Integration Guide

#### Basic Setup
```javascript
import { Editor } from '@toast-ui/editor';
import { MarkReview } from 'markreview';

// Initialize Toast UI Editor
const editor = new Editor({
  el: document.querySelector('#editor'),
  height: '500px',
  initialEditType: 'markdown',
  previewStyle: 'vertical',
  initialValue: '# Your content with {++CriticMarkup++} syntax'
});

// Initialize MarkReview after editor loads
editor.on('load', () => {
  MarkReview.init({
    target: editor.getEditorElement(),
    mode: 'markup',
    showBars: true,
    comments: {
      enabled: true,
      allowReplies: true,
      allowResolution: true
    }
  });
});
```

#### Advanced Toast UI Configuration
```javascript
// Custom configuration for Toast UI Editor
const markReviewConfig = {
  target: editor.getEditorElement(),
  mode: 'markup',
  showBars: true,
  comments: {
    enabled: true,
    allowReplies: true,
    allowResolution: true,
    maxReplies: 10
  },
  // Toast UI-specific options
  toastUI: {
    syncMarkdown: true,
    preserveSelection: true,
    updateOnChange: true,
    handlePreviewMode: true
  }
};

MarkReview.init(markReviewConfig);
```

#### Event Handling for Toast UI
```javascript
// Handle MarkReview events
MarkReview.on('change-accepted', (changeElement, originalContent, finalContent) => {
  // Update Toast UI content
  editor.setMarkdown(finalContent);
});

MarkReview.on('change-rejected', (changeElement, originalContent, finalContent) => {
  // Update Toast UI content
  editor.setMarkdown(originalContent);
});

// Handle Toast UI events
editor.on('change', () => {
  // Re-scan for CriticMarkup when content changes
  MarkReview.scan();
});

editor.on('previewRender', () => {
  // Apply MarkReview to preview mode
  MarkReview.applyToPreview(editor.getPreviewElement());
});
```

### Docusaurus Integration Guide

#### Plugin Installation
```bash
npm install markreview
```

#### Docusaurus Configuration
```javascript
// docusaurus.config.js
module.exports = {
  // ... other config
  plugins: [
    [
      'markreview',
      {
        // MarkReview plugin options
        mode: 'markup',
        showBars: true,
        comments: {
          enabled: true,
          allowReplies: true,
          allowResolution: true
        },
        users: {
          current: {
            id: 'user-123',
            name: 'John Doe',
            avatar: 'https://example.com/avatar.jpg'
          }
        }
      }
    ]
  ]
};
```

#### MDX Integration
```jsx
// In your MDX files
import { MarkReview } from 'markreview';

export default function MyDoc() {
  return (
    <div>
      <h1>My Documentation</h1>
      <p>This is a paragraph with {++CriticMarkup++} syntax.</p>
      <p>This shows {--deletions--} and {~~substitutions~>changes~~}.</p>
      
      {/* Initialize MarkReview for this page */}
      <MarkReview 
        mode="markup"
        showBars={true}
        comments={{ enabled: true }}
      />
    </div>
  );
}
```

#### Custom Docusaurus Plugin
```javascript
// plugins/markreview-plugin.js
const { MarkReview } = require('markreview');

module.exports = function markreviewPlugin(context, options) {
  return {
    name: 'markreview-plugin',
    configureWebpack(config, isServer) {
      // Add MarkReview assets
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\.css$/,
              include: /markreview/,
              use: ['style-loader', 'css-loader']
            }
          ]
        }
      };
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: '/js/markreview.js'
            }
          }
        ],
        bodyTags: [
          {
            tagName: 'script',
            innerHTML: `
              document.addEventListener('DOMContentLoaded', function() {
                MarkReview.init(${JSON.stringify(options)});
              });
            `
          }
        ]
      };
    }
  };
};
```

### Integration Testing Guide

#### Test Setup for Each Platform
```javascript
// test/integration/markreview.test.js
import { MarkReview } from 'markreview';

describe('MarkReview Integration Tests', () => {
  beforeEach(() => {
    // Setup test environment
    document.body.innerHTML = `
      <div id="editor">
        <p>Test content with {++CriticMarkup++} syntax</p>
      </div>
    `;
  });

  test('TipTap Integration', async () => {
    // Test TipTap integration
    const editor = new Editor({
      element: document.querySelector('#editor'),
      extensions: [StarterKit]
    });

    MarkReview.init({
      target: editor.view.dom,
      mode: 'markup'
    });

    expect(MarkReview.isInitialized()).toBe(true);
  });

  test('Milkdown Integration', async () => {
    // Test Milkdown integration
    const editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, document.querySelector('#editor'));
      })
      .use(commonmark)
      .create();

    MarkReview.init({
      target: editor.dom,
      mode: 'markup'
    });

    expect(MarkReview.isInitialized()).toBe(true);
  });

  test('Toast UI Integration', () => {
    // Test Toast UI integration
    const editor = new Editor({
      el: document.querySelector('#editor')
    });

    MarkReview.init({
      target: editor.getEditorElement(),
      mode: 'markup'
    });

    expect(MarkReview.isInitialized()).toBe(true);
  });
});
```

### Performance Considerations

#### Bundle Size Optimization
```javascript
// Optimize bundle size for each platform
const markReviewConfig = {
  // Core features only
  features: {
    changeBars: true,
    acceptReject: true,
    comments: true,
    attribution: true,
    // Disable advanced features for smaller bundle
    suggestions: false,
    history: false,
    bulkOperations: false
  }
};
```

#### Lazy Loading
```javascript
// Lazy load MarkReview for better performance
const loadMarkReview = async () => {
  const { MarkReview } = await import('markreview');
  return MarkReview;
};

// Load only when needed
document.addEventListener('DOMContentLoaded', async () => {
  const MarkReview = await loadMarkReview();
  MarkReview.init(config);
});
```

---

## 15. Export and Reporting System

### Export Functionality Overview
MarkReview provides comprehensive export capabilities that allow reviewers to download detailed reports of all changes and comments with full attribution information.

### Export Formats

#### 1. **PDF Report**
Professional PDF reports suitable for formal review documentation:

```javascript
// Generate PDF report
MarkReview.exportPDF({
  title: 'Document Review Report',
  subtitle: 'Changes and Comments Summary',
  includeChanges: true,
  includeComments: true,
  includeAttribution: true,
  format: 'detailed' // 'summary' | 'detailed'
});
```

**PDF Report Structure:**
```
Document Review Report
Generated: January 1, 2024 at 10:00 AM

EXECUTIVE SUMMARY
- Total Changes: 15
- Accepted Changes: 12
- Rejected Changes: 2
- Pending Changes: 1
- Total Comments: 8
- Resolved Comments: 6

DETAILED CHANGES
1. Line 23: "old text" was changed to "new text" by John Doe on 2024-01-01 09:30 AM
   Status: Accepted
   Comments: 2 replies
   
2. Line 45: "deleted content" was removed by Jane Smith on 2024-01-01 10:15 AM
   Status: Pending
   Comments: 1 reply

COMMENTS SUMMARY
1. Comment by John Doe on Line 23 (2024-01-01 09:30 AM)
   "This change improves clarity and follows our style guide."
   Status: Resolved
   Replies: 2
   
2. Comment by Jane Smith on Line 45 (2024-01-01 10:15 AM)
   "Should we keep this section?"
   Status: Active
   Replies: 1
```

#### 2. **CSV Export**
Structured data export for analysis in spreadsheet applications:

```javascript
// Generate CSV report
MarkReview.exportCSV({
  includeChanges: true,
  includeComments: true,
  includeAttribution: true,
  dateFormat: 'ISO' // 'ISO' | 'local' | 'relative'
});
```

**CSV Structure:**
```csv
Type,Line,Original,Changed,Author,Timestamp,Status,Comments
addition,23,"","new text",John Doe,2024-01-01T09:30:00Z,accepted,2
deletion,45,"old content","",Jane Smith,2024-01-01T10:15:00Z,pending,1
substitution,67,"old text","new text",Mike Johnson,2024-01-01T11:00:00Z,rejected,0
comment,23,"","","John Doe",2024-01-01T09:30:00Z,resolved,"This change improves clarity"
reply,23,"","","Jane Smith",2024-01-01T09:45:00Z,active,"Agreed, much clearer"
```

#### 3. **JSON Export**
Programmatic access to all change and comment data:

```javascript
// Generate JSON report
const report = MarkReview.exportJSON({
  includeMetadata: true,
  includeHistory: true,
  format: 'detailed'
});

console.log(report);
```

**JSON Structure:**
```json
{
  "metadata": {
    "generated": "2024-01-01T10:00:00Z",
    "document": "document.md",
    "version": "1.0.0",
    "totalChanges": 15,
    "totalComments": 8
  },
  "changes": [
    {
      "id": "change-123",
      "type": "addition",
      "line": 23,
      "original": "",
      "changed": "new text",
      "author": {
        "id": "user-123",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "timestamp": "2024-01-01T09:30:00Z",
      "status": "accepted",
      "acceptedBy": {
        "id": "user-456",
        "name": "Jane Smith",
        "timestamp": "2024-01-01T14:00:00Z"
      },
      "comments": [
        {
          "id": "comment-789",
          "content": "This change improves clarity and follows our style guide.",
          "author": {
            "id": "user-123",
            "name": "John Doe"
          },
          "timestamp": "2024-01-01T09:30:00Z",
          "resolved": true,
          "replies": [
            {
              "id": "reply-101",
              "content": "Agreed, much clearer.",
              "author": {
                "id": "user-456",
                "name": "Jane Smith"
              },
              "timestamp": "2024-01-01T09:45:00Z"
            }
          ]
        }
      ]
    }
  ],
  "summary": {
    "accepted": 12,
    "rejected": 2,
    "pending": 1,
    "resolvedComments": 6,
    "activeComments": 2
  }
}
```

### Export UI Components

#### Floating Export Button
```html
<div class="mr-export-controls">
  <button class="mr-export-btn" title="Export changes and comments">
    📊 Export Report
  </button>
  <div class="mr-export-dropdown" style="display: none;">
    <button class="mr-export-pdf">📄 PDF Report</button>
    <button class="mr-export-csv">📊 CSV Data</button>
    <button class="mr-export-json">🔧 JSON Data</button>
  </div>
</div>
```

#### Export Configuration Dialog
```javascript
// Export configuration options
const exportConfig = {
  formats: ['pdf', 'csv', 'json'],
  include: {
    changes: true,
    comments: true,
    attribution: true,
    metadata: true,
    history: true
  },
  filters: {
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    authors: ['john.doe', 'jane.smith'],
    status: ['accepted', 'pending', 'rejected']
  },
  styling: {
    theme: 'light', // 'light' | 'dark' | 'custom'
    logo: 'https://example.com/logo.png',
    company: 'Acme Corp'
  }
};
```

### CLI Export Commands

#### Command Line Export
```bash
# Export all changes and comments to PDF
markreview export --format pdf --output review-report.pdf

# Export filtered changes to CSV
markreview export --format csv --filter "author:john.doe" --output johns-changes.csv

# Export JSON with full metadata
markreview export --format json --include metadata,history --output full-report.json

# Export specific date range
markreview export --format pdf --date-range "2024-01-01:2024-01-31" --output january-report.pdf
```

#### CI/CD Integration
```yaml
# GitHub Actions example
- name: Generate Review Report
  run: |
    markreview export --format pdf --output review-report.pdf
    markreview export --format json --output review-data.json
    
- name: Upload Reports
  uses: actions/upload-artifact@v2
  with:
    name: review-reports
    path: |
      review-report.pdf
      review-data.json
```

### Report Templates

#### Executive Summary Template
```javascript
const executiveSummary = {
  title: 'Document Review Report',
  sections: [
    {
      title: 'Overview',
      content: `This report summarizes all changes and comments made during the review of ${documentName}.`
    },
    {
      title: 'Key Statistics',
      content: `
        - Total Changes: ${totalChanges}
        - Accepted: ${acceptedChanges}
        - Rejected: ${rejectedChanges}
        - Pending: ${pendingChanges}
        - Total Comments: ${totalComments}
        - Resolved Comments: ${resolvedComments}
      `
    },
    {
      title: 'Reviewers',
      content: reviewers.map(r => `${r.name} (${r.changes} changes, ${r.comments} comments)`).join(', ')
    }
  ]
};
```

#### Detailed Change Log Template
```javascript
const changeLogTemplate = (changes) => {
  return changes.map(change => ({
    line: change.line,
    description: `${change.original} was changed to ${change.changed} by ${change.author.name} on ${formatDate(change.timestamp)}`,
    status: change.status,
    comments: change.comments.length,
    action: change.acceptedBy ? `Accepted by ${change.acceptedBy.name}` : 'Pending'
  }));
};
```

### Integration with Editor Frameworks

#### TipTap Export Integration
```javascript
// Export from TipTap editor
editor.on('markreview-export', (format) => {
  const content = editor.getHTML();
  const changes = MarkReview.getChanges();
  const comments = MarkReview.getComments();
  
  MarkReview.export({
    format,
    content,
    changes,
    comments,
    metadata: {
      editor: 'TipTap',
      version: editor.version,
      timestamp: new Date()
    }
  });
});
```

#### Docusaurus Export Integration
```javascript
// Export from Docusaurus page
const exportPageReport = async (pagePath) => {
  const content = await getPageContent(pagePath);
  const changes = MarkReview.getChanges();
  const comments = MarkReview.getComments();
  
  return MarkReview.export({
    format: 'pdf',
    content,
    changes,
    comments,
    metadata: {
      platform: 'Docusaurus',
      page: pagePath,
      generated: new Date()
    }
  });
};
```

---
