import { describe, it, expect } from 'vitest'
import { initToastUIAdapter } from '../src/adapters/toastui'

import { Schema } from 'prosemirror-model'
describe('initToastUIAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initToastUIAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })

  it('works with ProseMirror docs', () => {
    const schema = new Schema({
      nodes: { doc: { content: 'text*' }, text: {} },
    })
    const doc = schema.node('doc', null, [schema.text('hi')])
    const ctrl = initToastUIAdapter(doc)
    expect(ctrl.editor).toBe(doc)
  })
})
