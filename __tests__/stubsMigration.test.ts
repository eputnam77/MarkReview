import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { migratePythonStubs } from '../src/core/stubsMigration'

describe('migratePythonStubs', () => {
  it('removes files if present', () => {
    fs.writeFileSync('old.py', '')
    fs.writeFileSync('init.py', '')
    expect(migratePythonStubs(['old.py', 'init.py'])).toBe(true)
    expect(fs.existsSync('old.py')).toBe(false)
    expect(fs.existsSync('init.py')).toBe(false)
  })
})
