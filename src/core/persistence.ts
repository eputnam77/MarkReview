/** Representation of a minimal ProseMirror document. */
export interface PMDoc {
  text: string
}

/**
 * Accept or reject CriticMarkup marks inside a string or ProseMirror-like
 * document. When a document object is provided a new object is returned with the
 * updated text leaving the original untouched.
 */
export function persistMarks(
  doc: string | PMDoc,
  accept = true,
): string | PMDoc {
  const CHANGE_RE = /\{([+\-~=]{2})(.+?)\1\}/g
  const source = typeof doc === 'string' ? doc : doc.text
  const replace = (_: string, tag: string, content: string): string => {
    switch (tag) {
      case '++':
        return accept ? content : ''
      case '--':
        return accept ? '' : content
      case '==':
      case '~~':
        return content
      default:
        return ''
    }
  }
  const result = source.replace(CHANGE_RE, replace)
  return typeof doc === 'string' ? result : { ...doc, text: result }
}
