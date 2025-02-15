import { IComment } from './comment'
import { IPost } from './post'
import { IStory } from './story'
import { IUser } from './user'

export interface IReaction {
	id?: number
	type: string
	user_id: string
	post_id?: string | null
	comment_id?: string | null
	story_id?: string | null
	post?: IPost | null
	comment?: IComment | null
	story?: IStory | null
	user?: IUser
	created_at?: Date
	updated_at?: Date
}
