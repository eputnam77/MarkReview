import { describe, it, expect } from 'vitest'
import { persistMarks } from '../src/core/persistence'

describe('persistMarks', () => {
  it('accepts or rejects markup', () => {
    const text = 'a {++b++} {--c--}'
    expect(persistMarks(text, true)).toBe('a b ')
    expect(persistMarks(text, false)).toBe('a  c')
  })
})
