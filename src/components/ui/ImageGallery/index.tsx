import './style.css'

import clsx from 'clsx'
import { ArrowLeft02Icon, ArrowRight02Icon } from 'hugeicons-react'
import { motion } from 'motion/react'
import { FC, memo, useCallback, useRef, useState } from 'react'

import { IMedia } from '@/interfaces/media'
import { getMediaURL } from '@/utils/getUploadURL'
import { roundedVariants } from '@/utils/roundedVariants'

interface ImageGalleryProps {
	media: IMedia[]
	showCount?: number
	className?: string
}

const ImageGallery: FC<ImageGalleryProps> = ({
	media,
	className,
	showCount = 4,
}) => {
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
		[media.length],
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
		[media.length],
	)

	return (
		<>
			<div className='grid grid-cols-2 gap-1'>
				{media.slice(0, showCount).map((item, i) => (
					<div
						key={item.id}
						className={clsx(
							'relative transition-all cursor-pointer bg-center bg-cover bg-no-repeat',
							{
								'col-span-2':
									media.length === 1 ||
									(media.length === 3 && i == 2),
								'!min-h-[calc(120*4px)] !bg-contain':
									media.length === 1,
							},
							roundedVariants(media.length)[i],
							className,
						)}
						style={{
							backgroundImage: `url(${getMediaURL(item.id)})`,
						}}
						onClick={() => {
							toggleIsExpanded()
							setActiveIndex(i)
						}}>
						{i + 1 === showCount && media.length > showCount && (
							<div className='absolute inset-0 flex items-center text-2xl font-bold justify-center bg-[rgba(0,0,0,.3)] text-white rounded-2xl'>
								+{media.length - showCount}
							</div>
						)}
					</div>
				))}
			</div>

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
		</>
	)
}

export default memo(ImageGallery)
