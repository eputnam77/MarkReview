import { describe, it, expect } from 'vitest'
import { buildReviewPanel, registerPanelExtension, getPanelExtensions } from '../src/ui/reviewPanel'

describe('review panel utilities', () => {
  it('sorts ids', () => {
    const result = buildReviewPanel([{ id: 'b' }, { id: 'a' }])
    expect(result).toEqual(['a', 'b'])
  })

  it('registers panel extensions', () => {
    registerPanelExtension('ext')
    expect(getPanelExtensions()).toContain('ext')
  })
})
