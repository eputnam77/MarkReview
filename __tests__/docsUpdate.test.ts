import { describe, it, expect } from 'vitest'
import { updateDocumentationSite } from '../src/core/docsUpdate'

describe('updateDocumentationSite', () => {
  it('returns true', () => {
    expect(updateDocumentationSite()).toBe(true)
  })
})
