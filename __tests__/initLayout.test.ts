import { describe, it, expect } from 'vitest'
import { setupCoreLayout } from '../src/core/initLayout'

describe('setupCoreLayout', () => {
  it('returns true', () => {
    expect(setupCoreLayout()).toBe(true)
  })
})
