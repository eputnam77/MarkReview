import { describe, it, expect } from 'vitest'
import {
  buildReviewPanel,
  registerPanelExtension,
  getPanelExtensions,
  savePanelPreferences,
} from '../src/ui/reviewPanel'

describe('review panel utilities', () => {
  it('filters by query and type', () => {
    const changes = [
      { id: 'b', type: 'add', text: 'b' },
      { id: 'a', type: 'delete', text: 'a' },
    ]
    const { ids, stats } = buildReviewPanel(changes, 'a', ['delete'])
    expect(ids).toEqual(['a'])
    expect(stats.total).toBe(1)
    expect(stats.byType.delete).toBe(1)
  })

  it('registers panel extensions', () => {
    const ext = { id: 'ext', mount() {}, dispose() {} }
    registerPanelExtension(ext)
    expect(getPanelExtensions()).toContain(ext)
  })

  it('saves panel preferences', () => {
    const store: Record<string, string> = {}
    const prefs = savePanelPreferences(store, { collapsed: true })
    expect(prefs.collapsed).toBe(true)
    expect(store.panel_collapsed).toBe('true')
  })
})
