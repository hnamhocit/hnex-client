import clsx from 'clsx'
import { FC, memo } from 'react'

import { MediaType } from '@/types/media'
import Video from '../../Video'

interface MediaProps {
	blob: string
	type: MediaType
	className?: string
}

const Media: FC<MediaProps> = ({ blob, type, className }) => {
	switch (type) {
		case MediaType.IMAGE:
			return (
				<div
					className={clsx(
						'bg-center bg-cover bg-no-repeat cursor-pointer',
						className
					)}
					style={{
						backgroundImage: `url(${blob})`,
					}}></div>
			)
		case MediaType.VIDEO:
			return <Video src={blob} />
		default:
			break
	}
}

export default memo(Media)
