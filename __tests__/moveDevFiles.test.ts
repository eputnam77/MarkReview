import { describe, it, expect } from 'vitest'
import fs from 'fs'
import { moveProjectManagementFiles } from '../src/core/moveDevFiles'

describe('moveProjectManagementFiles', () => {
  it('simulates move without touching fs', () => {
    const files = moveProjectManagementFiles('.', true)
    expect(files).toContain('AGENTS.md')
  })

  it('moves files when dryRun=false', () => {
    fs.writeFileSync('AGENTS.md', '')
    const moved = moveProjectManagementFiles('.', false)
    expect(moved).toContain('AGENTS.md')
    expect(fs.existsSync('dev/AGENTS.md')).toBe(true)
    fs.rmSync('dev', { recursive: true, force: true })
  })
})
