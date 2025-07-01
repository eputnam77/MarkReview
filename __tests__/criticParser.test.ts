import { describe, it, expect } from 'vitest'
import { parseCriticMarkup } from '../src/core/criticParser'

describe('parseCriticMarkup', () => {
  it('parses supported tags', () => {
    const changes = parseCriticMarkup('Hello {++World++} {--old--}')
    expect(changes).toContainEqual({ type: 'add', text: 'World' })
    expect(changes).toContainEqual({ type: 'delete', text: 'old' })
  })
})
