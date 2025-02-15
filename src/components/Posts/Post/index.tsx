import moment from 'moment'
import { FC, memo } from 'react'
import { FaBookmark, FaComments, FaHeart, FaShare } from 'react-icons/fa'
import { GrPowerCycle } from 'react-icons/gr'
import { IoMenu } from 'react-icons/io5'

import Media from '@/components/Media'
import { IPost } from '@/interfaces/post'
import { Avatar, Button } from '@heroui/react'

const Post: FC<IPost> = ({ author, content, created_at, media }) => {
	return (
		<div className='p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Avatar
						src={author?.photo_url ?? undefined}
						alt={author?.display_name}
					/>

					<div>
						<div className='font-semibold text-sm'>
							{author?.display_name}
						</div>
						<div className='text-xs text-gray-700'>
							{moment(created_at).fromNow()}
						</div>
					</div>
				</div>

				<div className='flex items-center'>
					<Button
						isIconOnly
						variant='light'
						radius='full'>
						<FaBookmark />
					</Button>

					<Button
						isIconOnly
						variant='light'
						radius='full'>
						<IoMenu size={20} />
					</Button>
				</div>
			</div>

			<div className='text-sm'>{content}</div>

			<Media data={media ?? []} />

			<div className='flex'>
				<Button
					startContent={<FaHeart />}
					radius='full'
					variant='light'
					size='sm'
					fullWidth>
					Likes
				</Button>

				<Button
					startContent={<FaComments />}
					radius='full'
					variant='light'
					size='sm'
					fullWidth>
					Chat
				</Button>

				<Button
					startContent={<GrPowerCycle />}
					radius='full'
					variant='light'
					size='sm'
					fullWidth>
					Repost
				</Button>

				<Button
					startContent={<FaShare />}
					radius='full'
					variant='light'
					size='sm'
					fullWidth>
					Share
				</Button>
			</div>
		</div>
	)
}

export default memo(Post)
