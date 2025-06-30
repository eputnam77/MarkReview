/**
 * Accept or reject CriticMarkup marks in the provided text.
 */
export function persistMarks(text: string, accept = true): string {
    const CHANGE_RE = /\{([+\-~=]{2})(.+?)\1\}/g;

    const replace = (match: string, tag: string, content: string): string => {
        switch (tag) {
            case '++':
                return accept ? content : '';
            case '--':
                return accept ? '' : content;
            case '==':
            case '~~':
                return content;
            default:
                return '';
        }
    };

    return text.replace(CHANGE_RE, replace);
}

