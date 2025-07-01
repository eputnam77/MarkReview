import { describe, it, expect } from 'vitest'
import { attachPopupControls } from '../src/ui/popupWidget'
import { createCommentThread } from '../src/core/comments'

describe('attachPopupControls', () => {
  it('accepts and rejects changes', () => {
    const text = 'a {--b--}'
    expect(attachPopupControls('reject', text)).toBe('a b')
    expect(attachPopupControls('accept', text)).toBe('a ')
  })

  it('adds a comment', () => {
    const thread = createCommentThread()
    attachPopupControls('comment', 'x {++y++}', thread)
    expect(thread.list()).toHaveLength(1)
  })
})
