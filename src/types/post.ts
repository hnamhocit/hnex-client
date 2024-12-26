import { Comment } from './comment'
import { Media } from './media'
import { Reaction } from './reaction'
import { User } from './user'

export type Post = {
	id: string
	content: string
	media: Media[]
	user?: User
	reactions?: Reaction[]
	comments?: Comment[]
	_count?: {
		comments: number
	}
	userId: string
	createdAt: Date
	updatedAt: Date
}
