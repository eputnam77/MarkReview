/**
 * Parse a subset of CriticMarkup tags from a string.
 *
 * Supported tags are additions `{++ ++}`, deletions `{-- --}`, substitutions
 * `{~~ ~~}`, highlights `{== ==}` and comments `{>> <<}`. The function returns
 * an array of change objects describing the tag type and text content.
 */
export interface Change {
  type: string
  text: string
}

const CHANGE_RE = /\{([+\-~=]{2})(.+?)\1\}/g

export function parseCriticMarkup(input: string): Change[] {
  const changes: Change[] = []
  if (!input) {
    return changes
  }
  for (const match of input.matchAll(CHANGE_RE)) {
    const tag = match[1]
    const content = match[2]
    let type: string
    switch (tag) {
      case '++':
        type = 'add'
        break
      case '--':
        type = 'delete'
        break
      case '==':
        type = 'highlight'
        break
      case '~~':
        type = 'substitute'
        break
      default:
        type = 'comment'
    }
    changes.push({ type, text: content })
  }
  return changes
}
