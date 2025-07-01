import { describe, it, expect } from 'vitest'
import { initTiptapAdapter } from '../src/adapters/tiptap'

import { Schema } from 'prosemirror-model'
describe('initTiptapAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initTiptapAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })

  it('works with ProseMirror docs', () => {
    const schema = new Schema({
      nodes: { doc: { content: 'text*' }, text: {} },
    })
    const doc = schema.node('doc', null, [schema.text('hi')])
    const ctrl = initTiptapAdapter(doc)
    expect(ctrl.editor).toBe(doc)
  })
})
