/** Information about a tracked change. */
export interface ReviewChange {
  id: string
  type: string
  text: string
}

export interface PanelStats {
  /** Total number of displayed changes. */
  total: number
  /** Count of changes grouped by type. */
  byType: Record<string, number>
}

/**
 * Build a list of change ids for the review panel with optional text search.
 * Returns both the sorted identifiers and some basic statistics used for
 * counters in the UI.
 */
export function buildReviewPanel(
  changes: ReviewChange[],
  query = '',
  filter: string[] = [],
): { ids: string[]; stats: PanelStats } {
  const filtered = changes.filter(
    (c) =>
      (filter.length === 0 || filter.includes(c.type)) &&
      c.text.includes(query),
  )
  const ids = filtered.map((c) => String(c.id)).sort()
  const stats: PanelStats = { total: filtered.length, byType: {} }
  for (const c of filtered) {
    stats.byType[c.type] = (stats.byType[c.type] || 0) + 1
  }
  return { ids, stats }
}

// ---------------------------------------------------------------------------
// Extension registry
// ---------------------------------------------------------------------------

export interface PanelExtension {
  id: string
  mount(panelEl: HTMLElement, api: unknown): void
  dispose(): void
}

const EXTENSIONS: PanelExtension[] = []

/** Register a side-panel extension (e.g. FudgeAI). */
export function registerPanelExtension(ext: PanelExtension): void {
  EXTENSIONS.push(ext)
}

/** Return all registered extensions. */
export function getPanelExtensions(): PanelExtension[] {
  return [...EXTENSIONS]
}

// ---------------------------------------------------------------------------
// Preferences
// ---------------------------------------------------------------------------

export interface PanelPreferences {
  collapsed: boolean
}

export function savePanelPreferences(
  storage: Record<string, string>,
  prefs: PanelPreferences,
): PanelPreferences {
  storage['panel_collapsed'] = String(prefs.collapsed)
  return prefs
}
