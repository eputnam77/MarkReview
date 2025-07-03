# Metrics Utilities

Validate your user-testing results against MarkReview's success criteria.

## `validateUsabilityMetrics(metrics)`

Checks that key usability targets are met:

- Time to first accept under 30 seconds
- Zero shortcut failures
- Completion rate at least 95%

```ts
import { validateUsabilityMetrics } from '../core/usabilityMetrics'

const metrics = {
  timeToFirstAccept: 20,
  shortcutFailures: 0,
  completionRate: 0.98,
}

if (validateUsabilityMetrics(metrics)) {
  console.log('All targets met!')
}
```
