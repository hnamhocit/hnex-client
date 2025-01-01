import './style.css'

import { FC, lazy, memo, useCallback, useState } from 'react'

import { IMedia } from '@/interfaces/media'
import { getMediaURL } from '@/utils/getUploadURL'

const ImageDisplay = lazy(() => import('./ImageDisplay'))
const ImageExpand = lazy(() => import('./ImageExpand'))

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

	const toggleIsExpanded = useCallback(
		() => setIsExpanded((prev) => !prev),
		[],
	)

	return (
		<>
			<div className='grid grid-cols-2 gap-1'>
				{media.slice(0, showCount).map((item, i) => (
					<ImageDisplay
						url={getMediaURL(item.id)}
						i={i}
						media={media}
						key={item.id}
						className={className}
						onClick={() => {
							toggleIsExpanded()
							setActiveIndex(i)
						}}>
						{i + 1 === showCount && media.length > showCount && (
							<div className='absolute inset-0 flex items-center text-2xl font-bold justify-center bg-[rgba(0,0,0,.3)] text-white rounded-2xl'>
								+{media.length - showCount}
							</div>
						)}
					</ImageDisplay>
				))}
			</div>

			<ImageExpand
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
				isExpanded={isExpanded}
				toggleIsExpanded={toggleIsExpanded}
				media={media}
			/>
		</>
	)
}

export default memo(ImageGallery)
