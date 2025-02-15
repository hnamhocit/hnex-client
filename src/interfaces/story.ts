import { IMedia } from './media'
import { IReaction } from './reaction'
import { IUser } from './user'

export interface IStory {
	id?: number
	text?: string | null
	text_coordinates: string // JSON string
	media_id: number
	author_id: number
	viewers?: IUser[]
	reactions?: IReaction[]
	media?: IMedia
	author?: IUser
	created_at?: Date
	updated_at?: Date
}
