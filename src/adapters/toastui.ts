import { attach, Controller } from '../index';

/** Initialise MarkReview for a Toast UI editor instance. */
export function initToastUIAdapter(editor: unknown, options?: Record<string, unknown>): Controller {
    return attach(editor, options);
}

