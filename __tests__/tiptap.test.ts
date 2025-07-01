import { describe, it, expect } from 'vitest'
import { initTiptapAdapter } from '../src/adapters/tiptap'

describe('initTiptapAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initTiptapAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })
})
