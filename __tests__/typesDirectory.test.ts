import { describe, it, expect } from 'vitest'
import { ensureTypesDirectory } from '../src/core/typesDirectory'

describe('ensureTypesDirectory', () => {
  it('returns true', () => {
    expect(ensureTypesDirectory()).toBe(true)
  })
})
