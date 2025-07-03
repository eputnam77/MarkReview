export interface UsabilityMetrics {
  /** Seconds from opening the editor until the first change was accepted. */
  timeToFirstAccept: number
  /** Number of keyboard shortcut failures during testing. */
  shortcutFailures: number
  /** Percentage of completed review tasks, expressed as 0‑1. */
  completionRate: number
}

/**
 * Validate recorded usability metrics against the success criteria
 * defined in the PRD. The run passes when:
 *   - time to first accept is under 30 seconds
 *   - no shortcut failures occurred
 *   - at least 95% of tasks were completed
 */
export function validateUsabilityMetrics(metrics: UsabilityMetrics): boolean {
  return (
    metrics.timeToFirstAccept < 30 &&
    metrics.shortcutFailures === 0 &&
    metrics.completionRate >= 0.95
  )
}
