import { describe, it, expect } from 'vitest'
import { publishAlphaRelease } from '../src/core/releaseAlpha'

describe('publishAlphaRelease', () => {
  it('returns version string', () => {
    expect(publishAlphaRelease()).toBe('0.1.0')
  })
})
