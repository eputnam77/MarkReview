import { describe, it, expect } from 'vitest'
import { getCurrentUser, setUserProvider } from '../src/api/user'

describe('user helpers', () => {
  it('returns anonymous by default', () => {
    expect(getCurrentUser()).toEqual({ id: 'anonymous', name: 'Anonymous' })
  })

  it('allows overriding provider', () => {
    setUserProvider(() => ({ id: '1', name: 'Test' }))
    expect(getCurrentUser()).toEqual({ id: '1', name: 'Test' })
  })
})
