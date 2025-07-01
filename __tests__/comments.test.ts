import { describe, it, expect } from 'vitest'
import { createCommentThread, Comment } from '../src/core/comments'

describe('CommentThread', () => {
  it('adds and resolves comments', () => {
    const thread = createCommentThread()
    const c: Comment = { id: '1', changeId: 'a', content: 'hi', author: 'u', timestamp: new Date(), resolved: false, replies: [] }
    thread.add(c)
    expect(thread.list()).toHaveLength(1)
    thread.resolve('1')
    expect(thread.list()[0].resolved).toBe(true)
  })
})
