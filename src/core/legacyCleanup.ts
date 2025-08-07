/**
 * Remove references to legacy MarkReview packages.
 *
 * Currently, there are no legacy packages to strip, so the function
 * returns an empty list. It exists primarily to satisfy tests that
 * ensure the cleanup hook can be imported without side effects.
 */
export function removeLegacyPackages(): string[] {
  return []
}
