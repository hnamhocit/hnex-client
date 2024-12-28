import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/interfaces/user'
import { RootState } from '../..'
import { userExtraReducers } from './thunks'

export interface UserInitial {
	data: null | IUser
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState: UserInitial = {
	data: null,
	status: 'idle',
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUserData(state, action) {
			state.status = 'succeeded'
			state.data = action.payload
		},
		updateUserData(state, action) {
			state.data = { ...state.data, ...action.payload }
		},
	},
	extraReducers: userExtraReducers,
})

export const selectUser = (state: RootState) => state.user
export const { setUserData, updateUserData } = userSlice.actions

export default userSlice.reducer
