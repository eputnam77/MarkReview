import { parseCriticMarkup } from '../core/criticParser'

/** Options controlling the appearance of change bars. */
export interface ChangeBarOptions {
  /** Which side of the margin to place the bar on. Default is `left`. */
  side?: 'left' | 'right'
  /** Width of the bar in pixels. Must be positive. Default is `2`. */
  width?: number
  /** Bar colour. Defaults to `currentColor`. */
  color?: string
  /** Swap sides when the document direction is RTL. */
  rtl?: boolean
}

export interface ChangeBarResult {
  /** Number of changes found in the text. */
  count: number
  /** Computed CSS style for the bar pseudo element. */
  css: string
}

/**
 * Calculate styling for CriticMarkup change bars.
 *
 * The function returns the number of change marks along with a CSS snippet that
 * can be applied to a container element using `::before` so the layout remains
 * unaffected.
 */
export function applyChangeBars(
  text: string,
  opts: ChangeBarOptions = {},
): ChangeBarResult {
  const count = parseCriticMarkup(text).length
  let side: 'left' | 'right' = opts.side ?? 'left'
  if (opts.rtl) side = side === 'left' ? 'right' : 'left'
  const width = opts.width ?? 2
  if (width <= 0) throw new Error('width must be positive')
  const color = opts.color ?? 'currentColor'
  const css =
    `position:relative;` +
    `&::before{content:'';position:absolute;${side}:0;top:0;bottom:0;width:${width}px;background:${color};}`
  return { count, css }
}
