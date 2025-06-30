import { parseCriticMarkup } from '../core/criticParser';
import { persistMarks } from '../core/persistence';

/**
 * Apply a popup action (accept/reject) to the first CriticMarkup change.
 */
export function attachPopupControls(action: string, text: string): string {
    const changes = parseCriticMarkup(text);
    if (changes.length === 0) {
        return text;
    }
    if (action === 'accept') {
        return persistMarks(text, true);
    }
    if (action === 'reject') {
        return persistMarks(text, false);
    }
    return text;
}

