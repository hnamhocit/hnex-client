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
import { IReaction } from '@/interfaces/reaction'
import { IResponse } from '@/interfaces/response'

import Comments from './Comments'

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
			// Post delete
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
			// Comment created
			{
				name: 'comment:created',
				listener: ({ data }: { data: IComment }) => {
					setPost((prev) => {
						if (prev) {
							if (data.postId === prev?.id) {
								return {
									...prev,
									comments: [...(prev.comments || []), data],
								}
							}

							return prev
						}

						return null
					})
				},
			},
			// Comment updated
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
			// Comment deleted
			{
				name: 'comment:deleted',
				listener: ({ data }: { data: IComment }) => {
					setPost((prev) => {
						if (prev) {
							if (data.postId === prev.id) {
								return {
									...prev,
									comments: prev.comments?.filter(
										(c) => c.id !== data.id,
									),
								}
							}

							return prev
						}

						return null
					})
				},
			},
			// Reaction created
			{
				name: 'reaction:created',
				listener: ({ data }: { data: IReaction }) => {
					setPost((prev) => {
						if (prev) {
							return {
								...prev,
								comments: prev.comments?.map((comment) => {
									if (data.commentId === comment.id) {
										return {
											...comment,
											reactions: [
												...(comment.reactions ?? []),
												data,
											],
										}
									}
									return comment
								}),
							}
						}

						return null
					})
				},
			},
			// Reaction updated
			{
				name: 'reaction:updated',
				listener: ({ data }: { data: IReaction }) => {
					setPost((prev) => {
						if (prev) {
							return {
								...prev,
								comments: prev.comments?.map((comment) => {
									if (comment.id === data.commentId) {
										return {
											...comment,
											reactions: comment.reactions?.map(
												(r) => {
													if (r.id === data.id) {
														return {
															...r,
															...data,
														}
													}

													return r
												},
											),
										}
									}

									return comment
								}),
							}
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
