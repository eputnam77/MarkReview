/** Remove Python sources from the runtime package. */
export function cleanupPythonSources(): string[] {
  return ['src/stubs.py', 'src/__init__.py']
}
