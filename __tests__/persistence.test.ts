import { describe, it, expect } from 'vitest'
import { Schema } from 'prosemirror-model'
import { persistMarks } from '../src/core/persistence'

describe('persistMarks', () => {
  it('accepts or rejects markup', () => {
    const text = 'a {++b++} {--c--}'
    expect(persistMarks(text, true)).toBe('a b ')
    expect(persistMarks(text, false)).toBe('a  c')
  })

  it('works with ProseMirror nodes', () => {
    const schema = new Schema({
      nodes: {
        doc: { content: 'paragraph+' },
        paragraph: {
          content: 'text*',
          toDOM: () => ['p', 0],
          parseDOM: [{ tag: 'p' }],
        },
        text: {},
      },
    })
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, schema.text('x {--y--}')),
    ])
    const result = persistMarks(doc, false) as typeof doc
    expect(result.textContent).toBe('x y')
  })

  it('handles nested structures', () => {
    const schema = new Schema({
      nodes: {
        doc: { content: 'block+' },
        block: {
          content: 'text*',
          toDOM: () => ['div', 0],
          parseDOM: [{ tag: 'div' }],
        },
        text: {},
      },
    })
    const doc = schema.node('doc', null, [
      schema.node('block', null, schema.text('x {++y++}')),
      schema.node('block', null, [schema.text('{--z--} w')]),
    ])
    const accepted = persistMarks(doc, true) as typeof doc
    const rejected = persistMarks(doc, false) as typeof doc
    expect(accepted.textContent).toBe('x y w')
    expect(rejected.textContent).toBe('x z w')
  })
})
