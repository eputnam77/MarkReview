import { describe, it, expect } from 'vitest'
import { validateUsabilityMetrics } from '../src/core/usabilityMetrics'

describe('validateUsabilityMetrics', () => {
  it('passes when metrics meet thresholds', () => {
    const metrics = {
      timeToFirstAccept: 10,
      shortcutFailures: 0,
      completionRate: 1,
    }
    expect(validateUsabilityMetrics(metrics)).toBe(true)
  })

  it('fails when any metric falls short', () => {
    const metrics = {
      timeToFirstAccept: 40,
      shortcutFailures: 1,
      completionRate: 0.9,
    }
    expect(validateUsabilityMetrics(metrics)).toBe(false)
  })
})
