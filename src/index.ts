/**
 * Attach MarkReview to a ProseMirror editor instance.
 *
 * The real implementation would register change tracking and return a
 * controller with helper methods.  This minimal version simply validates the
 * editor argument and provides no-op callbacks so tests and example adapters
 * can exercise the public API without depending on the unfinished core.
 */
export interface Controller {
    /** Reference to the editor passed to {@link attach}. */
    editor: unknown;
    /** Accept all pending changes. */
    acceptAll(): void;
    /** Reject all pending changes. */
    rejectAll(): void;
}

export function attach(
    editor: unknown,
    _options: Record<string, unknown> | undefined = undefined,
): Controller {
    if (editor === null || editor === undefined) {
        throw new Error("Editor instance required");
    }
    return {
        editor,
        // No-op callbacks; real logic lives in future revisions.
        acceptAll() {
            /* noop */
        },
        rejectAll() {
            /* noop */
        },
    };
}

export { getCurrentUser, setUserProvider } from './api/user';

