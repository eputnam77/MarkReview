import { Node as PMNode } from 'prosemirror-model'

/** Alias for a ProseMirror document node. */
export type PMDoc = PMNode

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
  const source = typeof doc === 'string' ? doc : doc.textContent
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
  if (typeof doc === 'string') {
    return result
  }

  const json = doc.toJSON()
  const walk = (node: { text?: string; content?: unknown[] }): void => {
    if (node.text) {
      node.text = node.text.replace(CHANGE_RE, replace)
    }
    if (node.content) {
      for (const child of node.content)
        walk(child as { text?: string; content?: unknown[] })
    }
  }
  walk(json)
  return PMNode.fromJSON(doc.type.schema, json)
}
