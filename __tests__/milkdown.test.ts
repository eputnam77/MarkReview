import { describe, it, expect } from 'vitest'
import { initMilkdownAdapter } from '../src/adapters/milkdown'

describe('initMilkdownAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initMilkdownAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })
})
