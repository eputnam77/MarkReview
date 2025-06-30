/**
 * Build a simple list of change identifiers for display in a review panel.
 */
export function buildReviewPanel(changes: Array<{ id: string }>): string[] {
    return changes.map((c) => String(c.id)).sort();
}

