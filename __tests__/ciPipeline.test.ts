import { describe, it, expect } from 'vitest'
import { configureCiPipeline } from '../src/core/ciPipeline'

describe('configureCiPipeline', () => {
  it('includes ruff and pytest in returned commands', () => {
    const cmds = configureCiPipeline()
    expect(cmds).toContain('ruff')
    expect(cmds).toContain('pytest')
  })
})
