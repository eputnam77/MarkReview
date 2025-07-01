import { describe, it, expect } from 'vitest'
import { ensureTypesDirectory } from '../src/core/typesDirectory'
import fs from 'fs'

describe('ensureTypesDirectory', () => {
  it('creates directory when missing', () => {
    fs.rmSync('tmp-types', { recursive: true, force: true })
    expect(ensureTypesDirectory('tmp-types')).toBe(true)
    expect(fs.existsSync('tmp-types')).toBe(true)
    fs.rmSync('tmp-types', { recursive: true, force: true })
  })
})
