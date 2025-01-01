import clsx from 'clsx'
import { redirect } from 'next/navigation'
import { FC, memo, MouseEvent, useRef } from 'react'

import { IPost } from '@/interfaces/post'

import BusinessCard from '../BusinessCard'
import Author from './Author'
import Content from './Content'
import MoreDropdown from './MoreDropdown'

interface PostProps {
	post: IPost
	isDetail?: boolean
}

const Post: FC<PostProps> = ({ post, isDetail = false }) => {
	const avatarRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const actionsRef = useRef<HTMLDivElement>(null)

	const handleRedirect = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDetail) {
			const target = e.target as Node

			if (
				!contentRef.current?.contains(target) &&
				!actionsRef.current?.contains(target) &&
				!avatarRef.current?.contains(target)
			) {
				redirect(`/posts/${post?.id}`)
			}
		}
	}

	const content = (
		<Content
			post={post as IPost}
			isDetail={isDetail}
			ref={contentRef}
		/>
	)

	return (
		<div
			onClick={handleRedirect}
			className={clsx('transition', {
				'bg-white border p-4 shadow-md text-black hover:bg-gray-100 cursor-pointer rounded-2xl':
					!isDetail,
			})}>
			<div className='flex items-start gap-4'>
				<div className='flex flex-1 gap-4'>
					<div
						ref={avatarRef}
						className='h-fit shrink-0'>
						<BusinessCard
							size={isDetail ? 'lg' : 'md'}
							user={post.user}
						/>
					</div>

					{isDetail ? (
						<Author
							user={post.user}
							isDetail={isDetail}
							createdAt={post.createdAt}
							updatedAt={post.updatedAt}
						/>
					) : (
						content
					)}
				</div>

				<div
					ref={actionsRef}
					className='shrink-0'>
					<MoreDropdown
						id={post?.id}
						user={post?.user}
					/>
				</div>
			</div>

			{isDetail && <div className='mt-4'>{content}</div>}
		</div>
	)
}

export default memo(Post)
