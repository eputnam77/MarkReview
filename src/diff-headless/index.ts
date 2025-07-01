/**
 * Return a simple line diff between two documents.
 *
 * This is a lightweight placeholder for a real ProseMirror-aware diff.  It
 * compares the two inputs line by line and emits removed (`-`) and added
 * (`+`) markers similar to `git diff` output.
 */
export function diffDoc(oldDoc: unknown, newDoc: unknown): string[] {
  const oldLines = String(oldDoc ?? '').split(/\r?\n/)
  const newLines = String(newDoc ?? '').split(/\r?\n/)
  const diff: string[] = []
  const max = Math.max(oldLines.length, newLines.length)
  for (let i = 0; i < max; i += 1) {
    const a = oldLines[i]
    const b = newLines[i]
    if (a !== b) {
      if (a !== undefined) diff.push(`- ${a}`)
      if (b !== undefined) diff.push(`+ ${b}`)
    }
  }
  return diff
}
