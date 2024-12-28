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
	postId: string
	userId: string
	user?: IUser
	post?: IPost
	createdAt: Date
	updatedAt: Date
}
