import { parseCriticMarkup } from '../core/criticParser'
import { persistMarks } from '../core/persistence'
import { CommentThread, Comment } from '../core/comments'
import { getCurrentUser } from '../api/user'

/**
 * Apply a popup action (accept/reject/comment) to the first CriticMarkup change.
 * When `comment` is chosen a new comment is added to the provided thread.
 */
export function attachPopupControls(
  action: 'accept' | 'reject' | 'comment',
  text: string,
  thread?: CommentThread,
): string {
  const changes = parseCriticMarkup(text)
  if (changes.length === 0) return text

  switch (action) {
    case 'accept':
      return persistMarks(text, true)
    case 'reject':
      return persistMarks(text, false)
    case 'comment':
      if (!thread) return text
      const change = changes[0]
      const comment: Comment = {
        id: String(Date.now()),
        changeId: change.id ?? '0',
        content: change.text,
        author: getCurrentUser().name,
        timestamp: new Date(),
        resolved: false,
        replies: [],
      }
      thread.add(comment)
      return text
    default:
      return text
  }
}
