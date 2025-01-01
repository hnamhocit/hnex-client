import { IComment } from '@/interfaces/comment'

export function buildCommentTree(comments: IComment[]): IComment[] {
	const commentMap: { [key: string]: IComment } = {}

	// Initialize the map with comments
	comments.forEach((comment) => {
		commentMap[comment.id] = { ...comment, replies: [] }
	})

	const commentTree: IComment[] = []

	// Build the tree structure
	comments.forEach((comment) => {
		if (comment.parentCommentId === null) {
			commentTree.push(commentMap[comment.id])
		} else {
			const parentComment = commentMap[comment.parentCommentId]
			if (parentComment) {
				parentComment.replies!.push(commentMap[comment.id])
			}
		}
	})

	return commentTree
}
