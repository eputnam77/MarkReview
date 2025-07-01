import { describe, it, expect } from 'vitest'
import { initToastUIAdapter } from '../src/adapters/toastui'

describe('initToastUIAdapter', () => {
  it('returns a controller', () => {
    const ctrl = initToastUIAdapter({})
    expect(ctrl).toHaveProperty('editor')
  })
})
