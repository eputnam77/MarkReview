import { describe, it, expect } from 'vitest'
import { setupToolbar } from '../src/ui/toolbar'

describe('setupToolbar', () => {
  it('stores view and bar state in storage', () => {
    const store: Record<string, string> = {}
    const state = setupToolbar(store, 'markup', false)
    expect(state.view).toBe('markup')
    expect(state.showBars).toBe(false)
    expect(store.track_view).toBe('markup')
    expect(store.show_bars).toBe('false')
  })
})
