import { IMedia } from './media'
import { IPost } from './post'
import { IReaction } from './reaction'
import { IUser } from './user'

export type IComment = {
	id: string
	parentCommentId: string | null
	content: string
	mediaIds: string[]
	media?: IMedia[]
	reactions?: IReaction[]
	replies?: IComment[]
	parentComment?: IComment
	postId: string
	post?: IPost
	userId: string
	user?: IUser
	createdAt: Date
	updatedAt: Date
}
