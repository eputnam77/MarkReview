import { describe, it, expect } from 'vitest'
import { bindAction, loadKeymap } from '../src/keymap'
import { openPreferencesDialog } from '../src/keymap/preferences'

describe('keymap utils', () => {
  it('bindAction updates the keymap', () => {
    bindAction('accept', 'KeyZ')
    const map = loadKeymap()
    expect(map.accept).toBe('KeyZ')
  })

  it('openPreferencesDialog returns true', () => {
    expect(openPreferencesDialog()).toBe(true)
  })
})
