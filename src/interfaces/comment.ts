import { IMedia } from './media'
import { IPost } from './post'
import { IReaction } from './reaction'
import { IUser } from './user'

export interface IComment {
	id?: number
	content: string
	user_id: number
	post_id: number
	parent_comment_id?: string | null
	media?: IMedia[]
	reactions?: IReaction[]
	user?: IUser
	post?: IPost
	parent_comment?: Comment | null
	created_at?: Date
	updated_at?: Date
}
