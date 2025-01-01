import { IComment } from './comment'
import { IPost } from './post'
import { IUser } from './user'

export enum ReactionType {
	ANGRY = 'ANGRY',
	SMILE = 'SMILE',
	LIKE = 'LIKE',
	HEART = 'HEART',
	SURPRISE = 'SURPRISE',
	CRY = 'CRY',
}

export type IReaction = {
	type: ReactionType
	id: string
	userId: string
	postId?: string
	user?: IUser
	post?: IPost
	commentId?: string
	comment?: IComment
	createdAt: Date
	updatedAt: Date
}
