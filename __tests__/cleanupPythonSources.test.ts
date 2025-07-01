import { describe, it, expect } from 'vitest'
import { cleanupPythonSources } from '../src/core/cleanupPythonSources'

describe('cleanupPythonSources', () => {
  it('returns list of python files', () => {
    const files = cleanupPythonSources()
    expect(files).toContain('src/stubs.py')
  })
})
