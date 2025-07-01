import { describe, it, expect } from 'vitest'
import { startDiffServer } from '../src/api/server'

describe('startDiffServer', () => {
  it('returns started', () => {
    expect(startDiffServer()).toBe('started')
  })
})
