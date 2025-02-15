export interface IMedia {
	id?: number
	name: string
	path: string
	size: number
	content_type: string
	user_id: number
	post_id?: number | null
	comment_id?: number | null
	created_at?: Date
	updated_at?: Date
}
