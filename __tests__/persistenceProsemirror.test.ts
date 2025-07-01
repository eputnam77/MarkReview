import { describe, it, expect } from 'vitest'
import { schema } from 'prosemirror-schema-basic'
import { persistMarks } from '../src/core/persistence'

describe('persistMarks with basic schema', () => {
  it('handles real ProseMirror nodes', () => {
    const doc = schema.node('doc', null, [
      schema.node('paragraph', null, schema.text('a {--b--} c')),
    ])
    const result = persistMarks(doc, false) as typeof doc
    expect(result.textContent).toBe('a b c')
  })
})
