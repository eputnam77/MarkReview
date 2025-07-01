export interface Comment {
  id: string
  changeId: string
  content: string
  author: string
  timestamp: Date
  resolved: boolean
  replies: Comment[]
}

/** Simple in-memory comment thread manager with JSON persistence. */
export class CommentThread {
  private _comments = new Map<string, Comment>()

  add(comment: Comment): void {
    this._comments.set(comment.id, comment)
  }

  resolve(commentId: string): void {
    const c = this._comments.get(commentId)
    if (c) c.resolved = true
  }

  list(): Comment[] {
    return Array.from(this._comments.values())
  }

  /** Serialise the comment thread for storage. */
  toJSON(): string {
    return JSON.stringify(this.list())
  }

  /** Load comments from a previously serialised JSON string. */
  loadFromJSON(json: string): void {
    try {
      const arr: Comment[] = JSON.parse(json)
      for (const c of arr) {
        this.add({ ...c, timestamp: new Date(c.timestamp) })
      }
    } catch {
      // ignore malformed input
    }
  }

  /** Extract @mentions from a comment string. */
  static extractMentions(text: string): string[] {
    const matches = text.match(/@([\w-]+)/g) || []
    return matches.map((m) => m.slice(1))
  }
}

export function createCommentThread(): CommentThread {
  return new CommentThread()
}
