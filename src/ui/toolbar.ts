/** Store and return the selected toolbar view. */
export interface ToolbarState {
  view: string
  showBars: boolean
}

export function setupToolbar(
  storage: Record<string, string>,
  view: string,
  showBars = true,
): ToolbarState {
  storage['track_view'] = view
  storage['show_bars'] = String(showBars)
  return { view, showBars }
}
