import { describe, it, expect } from 'vitest'
import { checkBundleSize, scanDomBenchmark } from '../src/core/performance'

describe('performance helpers', () => {
  it('returns numeric bundle sizes', () => {
    const sizes = checkBundleSize('aaa', 'bb')
    expect(sizes.js).toBeGreaterThan(0)
    expect(sizes.css).toBeGreaterThan(0)
  })

  it('returns a benchmark value based on length', () => {
    expect(scanDomBenchmark('xxxx')).toBe(0.004)
  })
})
