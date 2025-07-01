import { describe, it, expect } from 'vitest'
import {
  createCommentThread,
  CommentThread,
  Comment,
} from '../src/core/comments'

describe('CommentThread', () => {
  it('adds, serialises and resolves comments', () => {
    const thread = createCommentThread()
    const c: Comment = {
      id: '1',
      changeId: 'a',
      content: '@u hi',
      author: 'u',
      timestamp: new Date(),
      resolved: false,
      replies: [],
    }
    thread.add(c)
    const json = thread.toJSON()
    const t2 = new CommentThread()
    t2.loadFromJSON(json)
    expect(t2.list()).toHaveLength(1)
    expect(CommentThread.extractMentions(c.content)).toContain('u')
    t2.resolve('1')
    expect(t2.list()[0].resolved).toBe(true)
  })
})
