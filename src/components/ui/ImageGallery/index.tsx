import clsx from 'clsx'
import { ArrowLeft02Icon, ArrowRight02Icon } from 'hugeicons-react'
import { motion } from 'motion/react'
import { FC, memo, useCallback, useRef, useState } from 'react'

import { Media } from '@/types/media'
import { getMediaURL } from '@/utils/getUploadURL'
import './style.css'

interface ImageGalleryProps {
	media: Media[]
	className?: string
}

const ImageGallery: FC<ImageGalleryProps> = ({ media, className }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const prevIndex = useRef(0)

	const toggleIsExpanded = () => setIsExpanded((prev) => !prev)

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
		[media.length]
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
		[media.length]
	)

	return (
		<>
			{media.map((item, i) => (
				<div
					key={item.id}
					className={clsx(
						className,
						'transition-all cursor-pointer bg-center bg-cover bg-no-repeat'
					)}
					style={{
						backgroundImage: `url(${getMediaURL(item.id)})`,
					}}
					onClick={() => {
						toggleIsExpanded()
						setActiveIndex(i)
					}}></div>
			))}

			<div
				onClick={toggleIsExpanded}
				className={clsx(
					'fixed overflow-hidden inset-0 z-[9999] flex glassmorphism items-center justify-center bg-contain bg-center bg-no-repeat transition-all',
					{
						'visible opacity-1': isExpanded,
						'invisible opacity-0': !isExpanded,
					}
				)}>
				<div className='absolute inset-0 -z-10'>
					{media.map((item, i) => (
						<div
							key={item.id}
							className={clsx(
								'w-full h-full bg-contain bg-center bg-no-repeat transition-all',
								isNext ? 'fadeInLeft' : 'fadeInRight',
								i !== activeIndex && 'hidden'
							)}
							style={{
								backgroundImage: `url(${getMediaURL(item.id)}`,
							}}></div>
					))}
				</div>

				<motion.button
					whileTap={{ scale: 0.95 }}
					onClick={(e) => {
						e.stopPropagation()
						handlePrev()
					}}
					className='absolute hover:bg-gray-200 bg-white top-1/2 left-[10%] z-10 -translate-y-1/2 rounded-full p-3 shadow-md'>
					<ArrowLeft02Icon />
				</motion.button>

				<motion.button
					whileTap={{ scale: 0.95 }}
					onClick={(e) => {
						e.stopPropagation()
						handleNext()
					}}
					className='absolute hover:bg-gray-200 bg-white top-1/2 right-[10%] z-10 -translate-y-1/2 rounded-full p-3 shadow-md'>
					<ArrowRight02Icon />
				</motion.button>

				<div className='absolute bottom-5 rounded-full shadow-md glassmorphism z-20 left-1/2 -translate-x-1/2 py-2 px-3 min-w-40 text-center font-semibold text-white'>
					{activeIndex + 1} / {media.length}
				</div>
			</div>
		</>
	)
}

export default memo(ImageGallery)
