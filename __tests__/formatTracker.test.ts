import { describe, it, expect } from 'vitest'
import { trackFormatChanges } from '../src/core/formatTracker'

describe('trackFormatChanges', () => {
  it('diffs words between versions', () => {
    const diff = trackFormatChanges('a b', 'a c')
    expect(diff).toContain('-b')
    expect(diff).toContain('+c')
  })
})
