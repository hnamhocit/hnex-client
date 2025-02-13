import { Image } from '@heroui/react'

const Story = () => {
	return (
		<div className='flex flex-col flex-1 gap-2 min-w-40 max-w-40 min-h-64'>
			<div className='flex-1 rounded-2xl shadow-md overflow-hidden'>
				<video
					src='https://www.w3schools.com/html/mov_bbb.mp4'
					className='w-full h-full object-cover'></video>
			</div>

			<div className='shrink-0 flex items-center gap-3'>
				<Image
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZcDAMXsmkcn3RgJMXy9OyZRm4rCI5tEzEQ&s'
					alt='Avatar'
					width={32}
					height={32}
					className='object-cover rounded-full border-2'
				/>

				<div>
					<div className='text-sm font-medium'>Hnamhocit</div>
					<div className='text-xs text-gray-700 leading-none'>
						5 hour ago
					</div>
				</div>
			</div>
		</div>
	)
}

export default Story
