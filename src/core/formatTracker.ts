/**
 * Detect simple format changes between two strings.
 *
 * This mirrors the Python stub used in tests and merely returns the added and
 * removed tokens reported by a naïve diff.  Real implementations would inspect
 * the document tree and emit rich change objects.
 */
export function trackFormatChanges(oldDoc: string, newDoc: string): string[] {
  const oldParts = oldDoc.split(/\s+/)
  const newParts = newDoc.split(/\s+/)
  const diff: string[] = []
  const max = Math.max(oldParts.length, newParts.length)
  for (let i = 0; i < max; i += 1) {
    const a = oldParts[i]
    const b = newParts[i]
    if (a !== b) {
      if (a !== undefined) diff.push(`-${a}`)
      if (b !== undefined) diff.push(`+${b}`)
    }
  }
  return diff
}
