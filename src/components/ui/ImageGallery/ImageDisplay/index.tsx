import clsx from 'clsx'
import {
	FC,
	HTMLAttributes,
	memo,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react'

import { IMedia } from '@/interfaces/media'
import { roundedVariants } from '@/utils/roundedVariants'

interface ImageDisplayProps extends HTMLAttributes<HTMLDivElement> {
	url: string
	children: ReactNode
	media: IMedia[]
	i: number
}

const ImageDisplay: FC<ImageDisplayProps> = ({
	url,
	children,
	media,
	i,
	...props
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		const img = new Image()

		img.onload = function () {
			const aspectRatio = this.height / this.width
			const newHeight = (ref.current?.clientWidth as number) * aspectRatio
			setHeight(newHeight)
		}

		img.src = url
	}, [url])

	return (
		<div
			{...props}
			ref={ref}
			className={clsx(
				'relative transition-all cursor-pointer bg-center bg-cover bg-no-repeat',
				{
					'col-span-2':
						media.length === 1 || (media.length === 3 && i == 2),
				},
				roundedVariants(media.length)[i],
				props.className,
			)}
			style={{
				height: media.length === 1 ? `${height}px` : 'auto',
				backgroundImage: `url(${url})`,
			}}>
			{children}
		</div>
	)
}

export default memo(ImageDisplay)
