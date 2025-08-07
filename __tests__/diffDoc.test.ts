import { describe, it, expect } from 'vitest'
import { diffDoc } from '../src/diff-headless'

describe('diffDoc', () => {
  it('returns git style diff lines', () => {
    const diff = diffDoc('a\n', 'b\n')
    expect(diff).toContain('- a')
    expect(diff).toContain('+ b')
  })

  it('returns empty array when docs match', () => {
    expect(diffDoc('same', 'same')).toHaveLength(0)
  })
})
