'use client'

import BusinessCard from '@/components/ui/BusinessCard'
import Post from '@/components/ui/Post'
import api from '@/config/axios'
import { ToastContext } from '@/context/ToastContext'
import { IPost } from '@/interfaces/post'
import { IResponse } from '@/interfaces/response'
import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'
import { Button, Textarea } from '@nextui-org/react'
import {
	Image02Icon,
	Link01Icon,
	SentIcon,
	TextBoldIcon,
	TextItalicIcon,
} from 'hugeicons-react'
import moment from 'moment'
import { redirect, useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const PostDetail = () => {
	const [post, setPost] = useState<IPost | null>(null)
	const [loading, setLoading] = useState(true)
	const { id } = useParams()
	const { newToast } = useContext(ToastContext)
	const user = useSelector(selectUser)

	useEffect(() => {
		const fetchPost = async () => {
			const { data } = await api.get<IResponse<IPost>>(`/posts/${id}`)
			setPost(data.data)
			setLoading(false)
		}

		fetchPost()
	}, [id])

	const handleDelete = async (id: string) => {
		const { data } = await api.delete<IResponse<IPost>>(`/posts/${id}`)

		if ('error' in data) {
			newToast({
				type: 'error',
				message: data.error ?? 'Unknown error!',
			})
			return
		}

		newToast({ message: 'Post deleted sucessfully!', type: 'success' })
		redirect('/')
	}

	if (loading) {
		return (
			<div className='flex gap-4'>
				<div className='shrink-0'></div>
				<div className='flex-1'></div>
			</div>
		)
	}

	return (
		<div className='space-y-4'>
			{post && (
				<Post
					post={post}
					onDelete={handleDelete}
					isDetail
				/>
			)}

			<div className='space-y-4'>
				<div className='flex items-center gap-4'>
					<BusinessCard user={user.data as IUser} />

					<div>
						<div className='font-semibold'>
							{user.data?.displayName}
						</div>
						<div className='text-sm text-gray-300'>
							@{user.data?.username}
						</div>
					</div>
				</div>

				<Textarea
					spellCheck='false'
					placeholder='comment...'
					classNames={{
						inputWrapper: '!bg-transparent border-2 shadow-md ',
						input: '!text-white',
					}}
				/>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Button
							isIconOnly
							size='sm'
							radius='full'
							variant='flat'
							color='primary'>
							<Image02Icon />
						</Button>
						<Button
							isIconOnly
							size='sm'
							radius='full'
							variant='flat'
							color='primary'>
							<Link01Icon />
						</Button>

						<Button
							isIconOnly
							size='sm'
							radius='full'
							variant='flat'
							color='primary'>
							<TextBoldIcon />
						</Button>

						<Button
							isIconOnly
							size='sm'
							radius='full'
							variant='flat'
							color='primary'>
							<TextItalicIcon />
						</Button>
					</div>

					<Button
						color='primary'
						radius='full'
						startContent={<SentIcon />}>
						Send
					</Button>
				</div>
			</div>

			{post?.comments?.map((comment) => (
				<div
					key={comment.id}
					className='flex items-center gap-4'>
					<div className='shrink-0'>
						<BusinessCard user={comment.user as IUser} />
					</div>

					<div className='flex-1 space-y-4'>
						<div className='flex items-center gap-3'>
							<div>{comment.user?.displayName}</div>
							<div>@{comment.user?.username}</div>
							<div>
								{moment(comment.updatedAt).format('DD/MM/YYYY')}
							</div>
						</div>

						<div>{comment.content}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default PostDetail
