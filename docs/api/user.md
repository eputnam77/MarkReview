# User Identity API

MarkReview keeps user logic separate so you can plug in your own authentication layer. Use `setUserProvider()` to supply a callback that returns the current user. Call `getCurrentUser()` anywhere in your UI code.

```ts
import { getCurrentUser, setUserProvider } from '../api/user'

setUserProvider(() => ({ id: '42', name: 'Alex' }))
console.log(getCurrentUser().name)
```
