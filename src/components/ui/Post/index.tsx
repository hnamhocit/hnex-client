import clsx from 'clsx'
import { redirect } from 'next/navigation'
import { FC, memo, MouseEvent, useRef } from 'react'

import { IPost } from '@/interfaces/post'
import { IUser } from '@/interfaces/user'
import { getMediaURL } from '@/utils/getUploadURL'

import BusinessCard from '../BusinessCard'
import ImageGallery from '../ImageGallery'
import Video from '../Video'
import Actions from './Actions'
import Author from './Author'
import MoreDropdown from './MoreDropdown'
import Reactions from './Reactions'

interface PostProps {
	post: IPost
	isDetail?: boolean
}

const Post: FC<PostProps> = ({
	post: { id, user, updatedAt, createdAt, content, media, reactions, _count },
	isDetail = false,
}) => {
	const avatarRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const actionsRef = useRef<HTMLDivElement>(null)

	const handleRedirect = (e: MouseEvent<HTMLDivElement>) => {
		const target = e.target as Node

		if (
			!contentRef.current?.contains(target) &&
			!actionsRef.current?.contains(target) &&
			!avatarRef.current?.contains(target)
		) {
			redirect(`/posts/${id}`)
		}
	}

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
							user={user as IUser}
						/>
					</div>

					<div
						ref={contentRef}
						className='flex flex-col cursor-default gap-4 flex-1'>
						<Author
							user={user as IUser}
							isDetail={isDetail}
							createdAt={createdAt}
							updatedAt={updatedAt}
						/>

						<div>{content}</div>

						{media.length > 0 &&
						media[0].contentType.split('/')[0] === 'video' ? (
							<Video src={getMediaURL(media[0].id)} />
						) : (
							<ImageGallery
								showCount={4}
								media={media}
								className='min-h-60 rounded-2xl'
							/>
						)}

						<Reactions reactions={reactions} />

						{!isDetail && (
							<Actions
								id={id}
								reactions={reactions}
								_count={_count}
							/>
						)}
					</div>
				</div>

				<div
					ref={actionsRef}
					className='shrink-0'>
					<MoreDropdown
						id={id}
						user={user}
					/>
				</div>
			</div>
		</div>
	)
}

export default memo(Post)
