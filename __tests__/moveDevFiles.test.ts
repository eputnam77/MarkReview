import { describe, it, expect } from 'vitest'
import { moveProjectManagementFiles } from '../src/core/moveDevFiles'

describe('moveProjectManagementFiles', () => {
  it('returns list of project files', () => {
    const files = moveProjectManagementFiles()
    expect(files).toContain('AGENTS.md')
  })
})
