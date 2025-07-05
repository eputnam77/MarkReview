# TipTap Integration

MarkReview ships with a small adapter so you can connect it to a TipTap editor in seconds.

1. **Install the package** if you haven't already:

```bash
pnpm install markreview
```

2. **Import the adapter** and pass it your TipTap `Editor` instance:

```ts
import { Editor } from '@tiptap/core'
import { initTiptapAdapter } from 'markreview/adapters/tiptap'
import 'markreview/styles.css'

const editor = new Editor({
  /* your setup */
})

const controller = initTiptapAdapter(editor)
```

The returned `controller` exposes helper methods like `acceptAll()` and `rejectAll()` so you can manage suggestions programmatically.

That's all it takes to bring MarkReview's change tracking and review tools into your TipTap project.
