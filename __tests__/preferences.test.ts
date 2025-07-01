import { describe, it, expect } from 'vitest'
import { openPreferencesDialog } from '../src/keymap/preferences'

describe('openPreferencesDialog', () => {
  it('returns true', () => {
    expect(openPreferencesDialog()).toBe(true)
  })
})
