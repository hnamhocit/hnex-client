import { Search01Icon, TradeUpIcon } from 'hugeicons-react'
import { motion } from 'motion/react'

const News = () => {
	return (
		<div className='p-4 shrink-0 bg-[rgba(55,65,81,.5)] backdrop-blur-md w-80 flex flex-col gap-7'>
			<motion.div
				whileTap={{ scale: 0.8 }}
				className='flex items-center gap-3 bg-white text-black backdrop-blur-md shadow-md py-3 px-4 rounded-full transition'>
				<input
					type='text'
					className='block bg-transparent outline-none'
					placeholder='Search...'
				/>

				<Search01Icon />
			</motion.div>

			<div className='space-y-3'>
				<div className='text-xl font-bold'>
					Popular keywords in your area
				</div>

				<div className='p-2 text-lg flex items-center justify-between gap-3 text-gray-300 font-medium bg-[rgba(0,0,0,.3)] rounded-full'>
					<TradeUpIcon />
					<div className='text-indigo-500 line-clamp-1'>
						lorem insum
					</div>
					<div className='text-sm'>200</div>
				</div>
				<div className='p-2 text-lg flex items-center justify-between gap-3 text-gray-300 font-medium bg-[rgba(0,0,0,.3)] rounded-full'>
					<TradeUpIcon />
					<div className='text-indigo-500 line-clamp-1'>
						lorem insum
					</div>
					<div className='text-sm'>301</div>
				</div>
				<div className='p-2 text-lg flex items-center justify-between gap-3 text-gray-300 font-medium bg-[rgba(0,0,0,.3)] rounded-full'>
					<TradeUpIcon />
					<div className='text-indigo-500 line-clamp-1'>
						lorem insum
					</div>
					<div className='text-sm'>2284</div>
				</div>
				<div className='p-2 text-lg flex items-center justify-between gap-3 text-gray-300 font-medium bg-[rgba(0,0,0,.3)] rounded-full'>
					<TradeUpIcon />
					<div className='text-indigo-500 line-clamp-1'>
						lorem insum
					</div>
					<div className='text-sm'>3200</div>
				</div>
			</div>

			<div className='text-xl font-bold'>Treding posts</div>
		</div>
	)
}

export default News
