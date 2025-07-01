# Core Utilities

These helpers provide the foundation for MarkReview's review workflow.

## `parseCriticMarkup(text)`

Parses CriticMarkup tags and returns a list of change objects with `type` and `text` fields.

```ts
import { parseCriticMarkup } from '../core/criticParser'
const changes = parseCriticMarkup('Hello {++World++}')
// [{ type: 'add', text: 'World' }]
```

## `persistMarks(textOrNode, accept = true)`

Accepts or rejects markup in a string or ProseMirror `Node`. The function walks
the document iteratively to avoid stack overflows and returns the cleaned value.

```ts
import { persistMarks } from '../core/persistence'
const accepted = persistMarks('a {--b--}', true)
// 'a '
const cleaned = persistMarks(pmDoc, true)
```

## `trackFormatChanges(oldDoc, newDoc)`

Returns a simple list of added and removed tokens when the formatting changes.

## `diffDoc(oldDoc, newDoc)`

Generates a lightweight line based diff without touching the DOM.

## `CommentThread`

Manages threaded comments in memory.

```ts
import { createCommentThread } from '../core/comments'
const thread = createCommentThread()
thread.add({
  id: '1',
  changeId: 'c1',
  content: 'Looks good',
  author: 'me',
  timestamp: new Date(),
  resolved: false,
  replies: [],
})
thread.resolve('1')
```
