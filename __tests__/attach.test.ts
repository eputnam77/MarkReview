import { describe, it, expect } from 'vitest'
import { attach } from '../src/index'

describe('attach', () => {
  it('returns a controller with the editor reference and callable methods', () => {
    const editor = {}
    const ctrl = attach(editor)
    expect(ctrl.editor).toBe(editor)
    ctrl.acceptAll()
    ctrl.rejectAll()
  })

  it('throws when editor is missing', () => {
    // @ts-expect-error deliberately calling with undefined
    expect(() => attach(undefined)).toThrow('Editor instance required')
  })
})
