// Enums for Role and Theme
export enum Role {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export enum Theme {
	LIGHT = 'LIGHT',
	DARK = 'DARK',
}

export interface IUser {
	id?: number
	password: string
	display_name: string
	email: string
	username: string
	bio: string | null
	phone_number: string | null
	photo_url: string | null
	background_url: string | null
	refresh_token: string | null
	theme: Theme
	role: Role
	is_email_verified: boolean
	is_banned: boolean
	created_at?: Date
	updated_at?: Date
}
