import { describe, it, expect } from 'vitest'
import { finalizeGaRelease } from '../src/core/releaseGa'

describe('finalizeGaRelease', () => {
  it('returns GA version string', () => {
    expect(finalizeGaRelease()).toBe('1.0.0')
  })
})
