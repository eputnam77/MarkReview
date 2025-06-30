import { parseCriticMarkup } from '../core/criticParser';

/**
 * Return the number of change bars that would be rendered for the given text.
 */
export function applyChangeBars(text: string): number {
    return parseCriticMarkup(text).length;
}

