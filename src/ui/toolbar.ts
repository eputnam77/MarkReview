/** Store and return the selected toolbar view. */
export function setupToolbar(
  storage: Record<string, string>,
  view: string,
): string {
  storage['track_view'] = view
  return view
}
