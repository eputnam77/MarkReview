import { describe, it, expect } from 'vitest'
import { enableRealtimeCollaboration } from '../src/collaboration'

describe('enableRealtimeCollaboration', () => {
  it('returns true', () => {
    expect(enableRealtimeCollaboration()).toBe(true)
  })
})
