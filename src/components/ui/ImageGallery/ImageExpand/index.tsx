import clsx from 'clsx'
import { ArrowLeft02Icon, ArrowRight02Icon } from 'hugeicons-react'
import { motion } from 'motion/react'
import { Dispatch, FC, memo, SetStateAction, useCallback, useRef } from 'react'

import { IMedia } from '@/interfaces/media'
import { getMediaURL } from '@/utils/getUploadURL'

interface ImageExpandProps {
	isExpanded: boolean
	toggleIsExpanded: () => void
	activeIndex: number
	setActiveIndex: Dispatch<SetStateAction<number>>
	media: IMedia[]
}

const ImageExpand: FC<ImageExpandProps> = ({
	isExpanded,
	toggleIsExpanded,
	activeIndex,
	setActiveIndex,
	media,
}) => {
	const prevIndex = useRef(0)

	const isNext = activeIndex > prevIndex.current

	const handleNext = useCallback(
		() =>
			setActiveIndex((prev) => {
				prevIndex.current = prev

				if (prev === media.length - 1) {
					return 0
				}
				return prev + 1
			}),
		[media.length, setActiveIndex],
	)

	const handlePrev = useCallback(
		() =>
			setActiveIndex((prev) => {
				prevIndex.current = prev

				if (prev === 0) {
					return media.length - 1
				}

				return prev - 1
			}),
		[media.length, setActiveIndex],
	)

	return (
		<div
			onClick={toggleIsExpanded}
			className={clsx(
				'fixed overflow-hidden inset-0 z-[9999] flex glassmorphism items-center justify-center bg-contain bg-center bg-no-repeat transition-all',
				{
					'visible opacity-1': isExpanded,
					'invisible opacity-0': !isExpanded,
				},
			)}>
			<div className='absolute inset-0 -z-10'>
				{media.map((item, i) => (
					<div
						key={item.id}
						className={clsx(
							'w-full h-full bg-contain bg-center bg-no-repeat transition-all',
							isNext ? 'fadeInLeft' : 'fadeInRight',
							i !== activeIndex && 'hidden',
						)}
						style={{
							backgroundImage: `url(${getMediaURL(item.id)}`,
						}}></div>
				))}
			</div>

			<div className='absolute top-1/2 left-[10%] z-10 -translate-y-1/2'>
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					onClick={(e) => {
						e.stopPropagation()
						handlePrev()
					}}
					className='hover:bg-primary-600 transition bg-primary-500 text-white rounded-full p-3 shadow-md'>
					<ArrowLeft02Icon />
				</motion.button>
			</div>

			<div className='absolute top-1/2 right-[10%] z-10 -translate-y-1/2'>
				<motion.button
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					onClick={(e) => {
						e.stopPropagation()
						handleNext()
					}}
					className='hover:bg-primary-600 bg-primary-500 transition text-white rounded-full p-3 shadow-md'>
					<ArrowRight02Icon />
				</motion.button>
			</div>

			<div className='absolute bottom-5 rounded-full shadow-md glassmorphism z-20 left-1/2 -translate-x-1/2 py-2 px-3 min-w-40 text-center font-semibold text-white'>
				{activeIndex + 1} / {media.length}
			</div>
		</div>
	)
}

export default memo(ImageExpand)
