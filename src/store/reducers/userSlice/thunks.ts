import api from '@/config/axios'
import { IResponse } from '@/interfaces/response'
import { IUser } from '@/interfaces/user'
import { clearTokens } from '@/utils/tokens'
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'

import { UserInitial } from './'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const { data } = await api.get<IResponse<IUser>>('users/me')
	return data.data
})

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (changes: Partial<IUser>) => {
		const { data } = await api.patch<IResponse<IUser>>('users/me', changes)
		return data.data
	},
)

export const userLogout = createAsyncThunk('user/logout', async () => {
	await api.get<IResponse<IUser>>('auth/logout')
	clearTokens()
})

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
	const { data } = await api.delete<IResponse<IUser>>('users/me')
	return data.data
})

export const userExtraReducers = (
	builder: ActionReducerMapBuilder<UserInitial>,
) => {
	builder
		.addCase(fetchUser.pending, (state) => {
			state.status = 'loading'
		})
		.addCase(fetchUser.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.data = action.payload
		})
		.addCase(fetchUser.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		})

	builder
		.addCase(userLogout.fulfilled, (state) => {
			state.data = null
			state.status = 'idle'
		})
		.addCase(userLogout.rejected, (state, action) => {
			state.error = action.error.message
		})

	builder
		.addCase(deleteUser.fulfilled, (state) => {
			state.data = null
		})
		.addCase(deleteUser.rejected, (state, action) => {
			state.error = action.error.message
		})

	builder
		.addCase(updateUser.fulfilled, (state, action) => {
			state.data = { ...state.data, ...action.payload }
		})
		.addCase(updateUser.rejected, (state, action) => {
			state.error = action.error.message
		})
}
