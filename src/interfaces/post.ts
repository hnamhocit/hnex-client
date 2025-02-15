import { IComment } from './comment'
import { IMedia } from './media'
import { IReaction } from './reaction'
import { IUser } from './user'

export interface IPost {
	id?: number
	content: string
	author_id: number
	comments?: IComment[]
	reactions?: IReaction[]
	media?: IMedia[]
	author?: IUser
	created_at?: Date
	updated_at?: Date
}
