import { describe, it, expect } from 'vitest'
import { attach } from '../src/index'

describe('attach', () => {
  it('returns a controller with the editor reference', () => {
    const editor = {}
    const ctrl = attach(editor)
    expect(ctrl.editor).toBe(editor)
    expect(typeof ctrl.acceptAll).toBe('function')
    expect(typeof ctrl.rejectAll).toBe('function')
  })
})
