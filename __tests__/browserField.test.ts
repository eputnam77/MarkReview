import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'

// Ensure bundlers honour the `browser` field by bundling a file that imports
// the node-only entry. Rollup with the node-resolve plugin should drop the
// helper when `browser: true` is set.

describe('package browser field', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: 'ignore' })
  })

  it('excludes node helpers from browser bundle', async () => {
    const bundle = await rollup({
      input: path.resolve(__dirname, 'fixtures/browser-entry.js'),
      plugins: [nodeResolve({ browser: true })],
    })
    const { output } = await bundle.generate({ format: 'esm' })
    const code = output[0].code
    expect(code).not.toMatch(/cleanupPythonSources/)
  })
})
