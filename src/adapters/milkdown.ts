import { attach, Controller } from '../index';

/** Initialise MarkReview for a Milkdown editor instance. */
export function initMilkdownAdapter(editor: unknown, options?: Record<string, unknown>): Controller {
    return attach(editor, options);
}

