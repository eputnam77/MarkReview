import { describe, it, expect } from 'vitest'
import { setupToolbar } from '../src/ui/toolbar'

describe('setupToolbar', () => {
  it('stores view in storage', () => {
    const store: Record<string, string> = {}
    const view = setupToolbar(store, 'markup')
    expect(view).toBe('markup')
    expect(store.track_view).toBe('markup')
  })
})
