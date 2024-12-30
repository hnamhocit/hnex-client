import { Skeleton } from '@nextui-org/react'

const PostDetailSekelton = () => {
	return (
		<div className='space-y-4'>
			<div className='flex items-center jusitfy-between'>
				<div className='flex items-center gap-4'>
					<Skeleton className='w-14 h-14 rounded-full' />

					<div className='space-y-2'>
						<div className='flex items-center gap-3'>
							<Skeleton className='h-7 w-40 rounded-md'></Skeleton>
							<Skeleton className='h-4 w-24 rounded-md'></Skeleton>
						</div>

						<Skeleton className='h-4 w-24 rounded-md'></Skeleton>
					</div>
				</div>
			</div>

			<Skeleton className='w-full h-60 rounded-md'></Skeleton>

			<div className='grid grid-cols-2 gap-1'>
				<Skeleton className='h-44 rounded-md'></Skeleton>
				<Skeleton className='h-44 rounded-md'></Skeleton>
			</div>

			<Skeleton className='w-44 h-4 rounded-md'></Skeleton>
		</div>
	)
}

export default PostDetailSekelton
