import { IModel } from './model'

export type Role = 'USER' | 'ADMIN'
export type Theme = 'LIGHT' | 'DARK'

export interface IUser extends IModel {
	photo_url?: string | null
	background_url?: string | null
	refresh_token?: string | null
	theme: Theme
	role: Role
	is_email_verified: boolean
	password: string
	display_name: string
	email: string
	username: string
	bio?: string | null
	phone_number?: string | null
}
