import { configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'
import userReducer from './reducers/userSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
