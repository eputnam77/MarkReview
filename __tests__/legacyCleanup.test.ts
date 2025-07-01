import { describe, it, expect } from 'vitest'
import { removeLegacyPackages } from '../src/core/legacyCleanup'

describe('removeLegacyPackages', () => {
  it('returns empty array', () => {
    expect(removeLegacyPackages()).toEqual([])
  })
})
