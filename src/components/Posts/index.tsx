'use client'

import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import api from '@/config/api'
import { IPost } from '@/interfaces/post'

import Post from './Post'

const Posts = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState<IPost[]>([])

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await api.get('/posts/')
				setPosts(response.data)
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(error.response?.data.error)
				}
			}

			setIsLoading(false)
		}

		fetchPosts()
	}, [])

	return (
		<div className='space-y-4'>
			{isLoading && <div>Loading...</div>}
			{posts.map((post) => (
				<Post
					key={post.id}
					{...post}
				/>
			))}
		</div>
	)
}

export default Posts
