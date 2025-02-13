'use client'

import { FaBookmark, FaHeart, FaShare } from 'react-icons/fa'
import { FaComments } from 'react-icons/fa6'
import { GrPowerCycle } from 'react-icons/gr'
import { IoMenu } from 'react-icons/io5'

import { Button, Image } from '@heroui/react'

const Posts = () => (
	<div className='space-y-4'>
		<div className='p-4 space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Image
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZcDAMXsmkcn3RgJMXy9OyZRm4rCI5tEzEQ&s'
						alt='Author'
						width={40}
						height={40}
						className='object-cover rounded-full border-2'
					/>

					<div>
						<div className='font-semibold text-sm'>Go lang</div>
						<div className='text-xs text-gray-700'>5 hour ago</div>
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

			<div className='text-sm'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Voluptas odio minima veniam ratione illo, saepe dolores. Impedit
				enim sequi delectus incidunt sapiente et quasi, labore repellat
				ex praesentium deleniti voluptatem!
			</div>

			<div className='grid grid-cols-2 gap-3'>
				<Image
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZcDAMXsmkcn3RgJMXy9OyZRm4rCI5tEzEQ&s'
					alt='Author'
					isZoomed
					className='object-cover min-h-40'
				/>

				<Image
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZcDAMXsmkcn3RgJMXy9OyZRm4rCI5tEzEQ&s'
					alt='Author'
					isZoomed
					className='object-cover min-h-40'
				/>
			</div>

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
	</div>
)

export default Posts
