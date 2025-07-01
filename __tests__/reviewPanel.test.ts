import { describe, it, expect } from 'vitest'
import {
  buildReviewPanel,
  registerPanelExtension,
  getPanelExtensions,
} from '../src/ui/reviewPanel'

describe('review panel utilities', () => {
  it('returns ids and stats', () => {
    const changes = [
      { id: 'b', type: 'add', text: 'b' },
      { id: 'a', type: 'delete', text: 'a' },
    ]
    const { ids, stats } = buildReviewPanel(changes, 'a')
    expect(ids).toEqual(['a'])
    expect(stats.total).toBe(1)
    expect(stats.byType.delete).toBe(1)
  })

  it('registers panel extensions', () => {
    const ext = { id: 'ext', mount() {}, dispose() {} }
    registerPanelExtension(ext)
    expect(getPanelExtensions()).toContain(ext)
  })
})
