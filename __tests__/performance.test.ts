import { describe, it, expect } from 'vitest'
import { checkBundleSize, scanDomBenchmark } from '../src/core/performance'

describe('performance helpers', () => {
  it('returns numeric bundle sizes', () => {
    const sizes = checkBundleSize()
    expect(typeof sizes.js).toBe('number')
    expect(typeof sizes.css).toBe('number')
  })

  it('returns a benchmark value', () => {
    expect(scanDomBenchmark('test')).toBe(0)
  })
})
