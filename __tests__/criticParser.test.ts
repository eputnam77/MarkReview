import { describe, it, expect } from 'vitest'
import { parseCriticMarkup } from '../src/core/criticParser'

describe('parseCriticMarkup', () => {
  it('parses supported tags', () => {
    const changes = parseCriticMarkup(
      'Add {++World++} Del {--old--} Highlight {==hi==} Sub {~~from~>to~~}',
    )
    expect(changes).toContainEqual({ type: 'add', text: 'World' })
    expect(changes).toContainEqual({ type: 'delete', text: 'old' })
    expect(changes).toContainEqual({ type: 'highlight', text: 'hi' })
    expect(changes).toContainEqual({ type: 'substitute', text: 'from~>to' })
  })
})
