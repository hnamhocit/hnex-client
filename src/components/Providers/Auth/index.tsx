import { AxiosError } from 'axios'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '@/config/api'
import { selectUser, setUser } from '@/store/slices/userSlice'
import { Spinner } from '@heroui/react'

import Enter from '../Enter'

const Auth = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectUser)
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		;(async () => {
			try {
				const response = await api.get('/users/profile')

				console.log(response.data)

				dispatch(setUser(response.data))
			} catch (error) {
				if (error instanceof AxiosError && error.response) {
					console.log(error.response.data.error)
				} else {
					console.error('Unknown error: ' + error)
				}
			}

			setLoading(false)
		})()
	}, [dispatch])

	if (loading) {
		return (
			<div className='h-screen flex items-center justify-center'>
				<Spinner size='lg' />
			</div>
		)
	}

	return !user ? <Enter /> : children
}

export default Auth
