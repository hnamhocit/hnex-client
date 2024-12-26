export type Comment = {
	id: string
	parentCommentId: string | null
	content: string
	postId: string
	userId: string
	createdAt: Date
	updatedAt: Date
}
