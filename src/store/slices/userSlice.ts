import { IUser } from '@/interfaces/user'
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../'

const initialState: { data: IUser | null } = { data: null }

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			state.data = action.payload
		},
		updateUser: (state, action) => {
			state.data = { ...(state.data ?? {}), ...action.payload }
		},
	},
})

export const { setUser, updateUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user.data

export default userSlice.reducer
