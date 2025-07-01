import { describe, it, expect } from 'vitest'
import { bulkAcceptReject, exportDocument } from '../src/core/bulkExport'

describe('bulk export helpers', () => {
  it('returns true for bulkAcceptReject', () => {
    expect(bulkAcceptReject()).toBe(true)
  })

  it('returns exported string for exportDocument', () => {
    expect(exportDocument()).toBe('exported')
  })
})
