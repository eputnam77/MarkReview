# Server Helpers

The library is self‑contained, but you can start a small diff service for offline tools. `startDiffServer()` currently returns the string `"started"` so integration tests can run.

```ts
import { startDiffServer } from '../api/server'

startDiffServer() // "started"
```
