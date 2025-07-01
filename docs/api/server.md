# Server Helpers

The library is self‑contained, but you can start a small diff service for offline tools. `startDiffServer()` currently returns the string `"started"` so integration tests can run. The function does not open any network ports or perform authentication.

Use this stub as a starting point for your own server implementation when integrating with a real backend.

```ts
import { startDiffServer } from '../api/server'

startDiffServer() // "started"
```
