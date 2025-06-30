export interface Comment {
    id: string;
    changeId: string;
    content: string;
    author: string;
    timestamp: Date;
    resolved: boolean;
    replies: Comment[];
}

export function createCommentThread(): void {
    throw new Error('Threaded comments system not implemented');
}
