import { describe, it, expect } from 'vitest'
import { attachPopupControls } from '../src/ui/popupWidget'

describe('attachPopupControls', () => {
  it('accepts and rejects changes', () => {
    const text = 'a {--b--}'
    expect(attachPopupControls('reject', text)).toBe('a b')
    expect(attachPopupControls('accept', text)).toBe('a ')
  })
})
