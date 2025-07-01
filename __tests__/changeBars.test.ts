import { describe, it, expect } from 'vitest'
import { applyChangeBars } from '../src/ui/changeBars'

describe('applyChangeBars', () => {
  it('counts critic markup changes', () => {
    const text = 'a {++b++} c {--d--}'
    expect(applyChangeBars(text)).toBe(2)
  })
})
