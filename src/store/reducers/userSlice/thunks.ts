import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'

import api from '@/config/axios'
import { IResponse } from '@/types/response'
import { User } from '@/types/user'
import { UserInitial } from '.'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const { data } = await api.get<IResponse<User>>('users/me')
	return data.data
})

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (changes: Partial<User>) => {
		const { data } = await api.patch<IResponse<User>>('users/me', changes)
		return data.data
	}
)

export const userLogout = createAsyncThunk('users/logout', async () => {
	const { data } = await api.get<IResponse<User>>('users/me/logout')
	return data.data
})

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
	const { data } = await api.delete<IResponse<User>>('users/me')
	return data.data
})

export const userExtraReducers = (
	builder: ActionReducerMapBuilder<UserInitial>
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
