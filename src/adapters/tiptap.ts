import { attach, Controller } from '../index'

/** Initialise MarkReview for a TipTap editor instance. */
export function initTiptapAdapter(
  editor: unknown,
  options?: Record<string, unknown>,
): Controller {
  return attach(editor, options)
}
