import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { cleanupPythonSources } from '../src/node/cleanupPythonSources'

describe('cleanupPythonSources', () => {
  it('removes python sources', () => {
    fs.writeFileSync('tmp1.py', '')
    fs.writeFileSync('tmp2.py', '')
    const removed = cleanupPythonSources(['tmp1.py', 'tmp2.py'])
    expect(removed).toContain('tmp1.py')
    expect(fs.existsSync('tmp1.py')).toBe(false)
  })
})
