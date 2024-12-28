'use client'

import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import CreatePostModal from '@/components/ui/CreatePostModal'
import SkeletonPost from '@/components/ui/Loadings/SkeletonPost'
import Post from '@/components/ui/Post'
import api from '@/config/axios'
import { socket } from '@/config/socket'
import { ToastContext } from '@/context/ToastContext'
import { IPost } from '@/interfaces/post'
import { selectUser } from '@/store/reducers/userSlice'

export default function Home() {
	const [posts, setPosts] = useState<IPost[]>([])
	const [loading, setLoading] = useState(true)
	const { newToast } = useContext(ToastContext)
	const user = useSelector(selectUser)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			const { data } = await api.get('posts')

			if ('error' in data) {
				newToast({ type: 'error', message: data.error })
				return
			}

			setLoading(false)
			setPosts(data.data)
		}

		fetchPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		socket.on('post:deleted', ({ data }) => {
			setPosts((prev) => prev.filter((p) => p.id !== data.id))
		})

		socket.on('post:created', ({ data }) => {
			if (data.user.id === user.data?.id) {
				setPosts((prev) => [...prev, data])
			}
		})

		socket.on('reaction:created', ({ data }) => {
			setPosts((prev) =>
				prev.map((p) => {
					if (p.id === data.postId) {
						return {
							...p,
							reactions: [...(p.reactions ?? []), data],
						}
					}

					return p
				}),
			)
		})

		socket.on('reaction:updated', ({ data }) => {
			setPosts((prev) =>
				prev.map((p) => {
					const isExist = p.reactions?.find((r) => r.id === data.id)

					if (isExist) {
						return {
							...p,
							reactions: p.reactions?.map((r) => {
								if (r.id === data.id) {
									return {
										...r,
										...data,
									}
								}

								return r
							}),
						}
					}

					return p
				}),
			)
		})

		return () => {
			socket.off('post:created')
			socket.off('post:deleted')
			socket.off('reaction:created')
			socket.off('reaction:updated')
		}
	}, [user.data?.id])

	return (
		<div className='space-y-7'>
			<CreatePostModal />

			<div className='space-y-5'>
				{loading ? (
					<>
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
					</>
				) : (
					posts.map((post) => (
						<Post
							key={post.id}
							post={post}
						/>
					))
				)}
			</div>
		</div>
	)
}
