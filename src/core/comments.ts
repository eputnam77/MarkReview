export interface Comment {
    id: string;
    changeId: string;
    content: string;
    author: string;
    timestamp: Date;
    resolved: boolean;
    replies: Comment[];
}

/** Simple in-memory comment thread manager. */
export class CommentThread {
    private _comments = new Map<string, Comment>();

    add(comment: Comment): void {
        this._comments.set(comment.id, comment);
    }

    resolve(commentId: string): void {
        const c = this._comments.get(commentId);
        if (c) c.resolved = true;
    }

    list(): Comment[] {
        return Array.from(this._comments.values());
    }
}

export function createCommentThread(): CommentThread {
    return new CommentThread();
}

