import fs from 'fs'

/** Remove legacy Python stubs now that TypeScript implementations exist. */
export function migratePythonStubs(
  paths = ['src/stubs.py', 'src/__init__.py'],
): boolean {
  for (const p of paths) {
    if (fs.existsSync(p)) fs.rmSync(p)
  }
  return true
}
