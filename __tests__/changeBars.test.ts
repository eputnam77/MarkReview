import { describe, it, expect } from 'vitest'
import { applyChangeBars } from '../src/ui/changeBars'

describe('applyChangeBars', () => {
  it('computes style and count', () => {
    const text = 'a {++b++} c {--d--}'
    const result = applyChangeBars(text, { width: 3, color: '#f00' })
    expect(result.count).toBe(2)
    expect(result.css).toContain('width:3px')
    expect(result.css).toContain('#f00')
  })

  it('swaps side in RTL and validates width', () => {
    const rtl = applyChangeBars('x', { rtl: true, side: 'left' })
    expect(rtl.css).toContain('right:0')
    expect(() => applyChangeBars('x', { width: 0 })).toThrow(
      'width must be positive',
    )
  })
})
