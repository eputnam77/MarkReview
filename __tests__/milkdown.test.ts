import { describe, it, expect } from 'vitest'
import { initMilkdownAdapter } from '../src/adapters/milkdown'
import * as root from '../src'
import { vi } from 'vitest'

import { Schema } from 'prosemirror-model'
describe('initMilkdownAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initMilkdownAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })

  it('works with ProseMirror docs', () => {
    const schema = new Schema({
      nodes: { doc: { content: 'text*' }, text: {} },
    })
    const doc = schema.node('doc', null, [schema.text('hi')])
    const ctrl = initMilkdownAdapter(doc)
    expect(ctrl.editor).toBe(doc)
  })

  it('forwards options to attach', () => {
    const spy = vi.spyOn(root, 'attach')
    const opts = { a: 1 }
    initMilkdownAdapter({}, opts)
    expect(spy).toHaveBeenCalledWith({}, opts)
    spy.mockRestore()
  })
})
