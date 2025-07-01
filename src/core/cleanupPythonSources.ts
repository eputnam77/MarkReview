import fs from 'fs'

/** Remove Python sources from the runtime package. */
export function cleanupPythonSources(
  paths = ['src/stubs.py', 'src/__init__.py'],
): string[] {
  const removed: string[] = []
  for (const p of paths) {
    if (fs.existsSync(p)) {
      fs.rmSync(p)
      removed.push(p)
    }
  }
  return removed
}
