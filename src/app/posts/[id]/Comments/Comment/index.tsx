import {
	MailReply02Icon,
	MoreHorizontalCircle02Icon,
	ShieldKeyIcon,
} from 'hugeicons-react'
import moment from 'moment'
import { FC, memo, useState } from 'react'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'

import BusinessCard from '@/components/ui/BusinessCard'
import Dropdown from '@/components/ui/Dropdown'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import ImageGallery from '@/components/ui/ImageGallery'
import ReactionButton from '@/components/ui/ReactionButton'
import UserReactions from '@/components/ui/UserReactions'
import { socket } from '@/config/socket'
import { IComment } from '@/interfaces/comment'
import { IMedia } from '@/interfaces/media'
import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'
import { Button } from '@nextui-org/react'

import CommentComposer from '../CommentComposer'

interface CommentProps {
	comment: IComment
	id: string | undefined
	user: IUser | undefined
}

const Comment: FC<CommentProps> = ({ comment, id, user }) => {
	const [isReply, setIsReply] = useState(false)
	const me = useSelector(selectUser)

	const toggleIsReply = () => setIsReply((prev) => !prev)

	const handleReaction = (type: string) => {
		const isExist = comment.reactions?.find((r) => r.userId === me.data?.id)

		if (isExist) {
			socket.emit('reaction:update', {
				id: isExist.id,
				type,
			})
		} else {
			socket.emit('reaction:create', {
				userId: me.data?.id,
				data: {
					commentId: comment.id,
					type,
				},
			})
		}
	}

	const handleDeleteComment = () =>
		socket.emit('comment:delete', { id: comment.id })

	return (
		<div className='flex gap-4'>
			<div className='shrink-0'>
				<BusinessCard user={comment.user} />
			</div>

			<div className='flex-1 space-y-4'>
				<div className='bg-white text-black space-y-4 p-4 rounded-2xl'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-3 text-lg font-semibold'>
							{comment.user?.id === me.data?.id
								? 'You'
								: comment.user?.displayName}
							{comment.userId === user?.id && <ShieldKeyIcon />}
						</div>
						<div className='text-sm text-gray-700'>
							@{comment.user?.username}
						</div>
						<div className='text-sm text-gray-700'>
							{moment(comment.updatedAt).fromNow()}
						</div>
					</div>

					{(comment.media ?? []).length > 0 && (
						<ImageGallery
							media={comment.media as IMedia[]}
							className='min-h-60'
						/>
					)}

					<Markdown
						className='text-black markdown'
						remarkPlugins={[remarkGfm]}>
						{comment.content}
					</Markdown>

					<UserReactions reactions={comment.reactions} />
				</div>

				<div className='flex items-center gap-3 justify-end'>
					<ReactionButton
						reactions={comment.reactions}
						onReaction={handleReaction}
						className='text-white'
					/>

					<Button
						type='button'
						size='sm'
						radius='full'
						variant='light'
						startContent={<MailReply02Icon />}
						className='text-white'
						onPress={toggleIsReply}>
						Reply
					</Button>

					<Dropdown
						menuClassName='glassmorphism'
						position='bottom-right'
						trigger={<MoreHorizontalCircle02Icon />}
						triggerClassName='text-xs'>
						<DropdownItem className='text-white'>
							Report
						</DropdownItem>
						<DropdownItem className='text-white'>Edit</DropdownItem>
						<DropdownItem
							className='text-white'
							onClick={handleDeleteComment}>
							Delete
						</DropdownItem>
					</Dropdown>
				</div>

				{isReply && (
					<CommentComposer
						isReply={isReply}
						reply={comment}
						id={id}
					/>
				)}

				{comment.replies?.map((c) => (
					<Comment
						key={c.id}
						comment={c}
						id={id}
						user={user}
					/>
				))}
			</div>
		</div>
	)
}

export default memo(Comment)
