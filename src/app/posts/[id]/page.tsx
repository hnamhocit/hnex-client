'use client'

import { redirect, useParams } from 'next/navigation'
import { useContext, useEffect, useMemo, useState } from 'react'

import PostDetailSekelton from '@/components/ui/Loadings/PostDetailSkeleton'
import Post from '@/components/ui/Post'
import api from '@/config/axios'
import { socket } from '@/config/socket'
import { ToastContext } from '@/context/ToastContext'
import { IComment } from '@/interfaces/comment'
import { IPost } from '@/interfaces/post'
import { IResponse } from '@/interfaces/response'

import Comments from './components/Comments'

const PostDetail = () => {
	const [post, setPost] = useState<IPost | null>(null)
	const [loading, setLoading] = useState(true)
	const { id } = useParams()
	const { newToast } = useContext(ToastContext)

	useEffect(() => {
		const fetchPost = async () => {
			const { data } = await api.get<IResponse<IPost>>(`/posts/${id}`)
			setPost(data.data)
			setLoading(false)
		}

		fetchPost()
	}, [id])

	const events = useMemo(
		() => [
			{
				name: 'post:deleted',
				listener: ({ data }: { data: IPost }) => {
					if (data.id === id) {
						newToast({
							message: 'Post deleted sucessfully!',
							type: 'success',
						})
						redirect('/')
					}
				},
			},
			{
				name: 'comment:created',
				listener: ({ data }: { data: IComment }) => {
					setPost((prev) => {
						if (prev) {
							if (data.postId === prev?.id) {
								return {
									...prev,
									comments: [
										...(prev?.comments ?? []),
										data as IComment,
									],
								}
							}

							return prev
						}

						return null
					})
				},
			},
			{
				name: 'comment:updated',
				listener: ({ data }: { data: IComment }) => {
					setPost((prev) => {
						if (prev) {
							if (data.postId === prev.id) {
								return {
									...prev,
									comments: prev.comments?.map((comment) => {
										if (comment.id === data.id) {
											return {
												...comment,
												...data,
											}
										}

										return comment
									}),
								}
							}

							return prev
						}

						return null
					})
				},
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[id],
	)

	useEffect(() => {
		events.forEach((event) => socket.on(event.name, event.listener))

		return () => {
			events.forEach((event) => socket.off(event.name, event.listener))
		}
	}, [events])

	if (loading) {
		return <PostDetailSekelton />
	}

	return (
		<div className='space-y-7'>
			{post && (
				<Post
					post={post}
					isDetail
				/>
			)}

			<Comments
				id={post?.id}
				comments={post?.comments}
			/>
		</div>
	)
}

export default PostDetail
