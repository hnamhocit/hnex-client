import clsx from 'clsx'
import { FC, memo } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'

import { BASE_URL } from '@/config/api'
import { IMedia } from '@/interfaces/media'

const roundedVariants = [
	['!rounded-2xl col-span-2'],
	['!rounded-tl-2xl rounded-bl-2xl', '!rounded-tr-2xl !rounded-br-2xl'],
	[
		'!rounded-tl-2xl !rounded-bl-2xl row-span-2',
		'!rounded-tr-2xl',
		'!rounded-br-2xl',
	],
	[
		'!rounded-tl-2xl',
		'!rounded-tr-2xl',
		'!rounded-bl-2xl',
		'!rounded-br-2xl',
	],
]

const getMediaURL = (media: IMedia) => {
	const splits = media.name.split('.')
	const ext = splits[splits.length - 1]
	const name = splits[0]
	return media.path.startsWith('./uploads')
		? `${BASE_URL.replace('/api', '')}/uploads/${name}-${media.id}.${ext}`
		: media.path
}

const getMediaType = (media: IMedia) => {
	const type = media.content_type.split('/')[0]
	return type
}

interface MediaProps {
	data: IMedia[]
	onDelete?: (index: number) => void
}

const Media: FC<MediaProps> = ({ data, onDelete }) => {
	return (
		<div className='grid grid-cols-2 gap-1'>
			{data.slice(0, 4).map((media, index) => {
				const type = getMediaType(media)
				const isImage = type === 'image'
				const isVideo = type === 'video'
				const isAudio = type === 'audio'

				const rounded =
					roundedVariants[data.length <= 4 ? data.length - 1 : 3][
						index
					]

				return (
					<div
						key={index}
						className={clsx(
							'relative',
							rounded,
							'overflow-hidden',
						)}>
						{data.length > 4 && index === 3 && (
							<div className='absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer'>
								<span className='text-white font-bold text-2xl'>
									+{data.length - 4}
								</span>
							</div>
						)}

						{isImage && (
							<div
								className={clsx(
									'bg-cover cursor-pointer bg-center bg-no-repeat min-h-48 h-full hover:scale-125 transition-all',
									data.length === 1 && '!min-h-[400px]',
								)}
								style={{
									backgroundImage: `url(${getMediaURL(
										media,
									)})`,
								}}></div>
						)}

						{isVideo && (
							<video
								src={media.path}
								className='w-full h-full object-cover'
							/>
						)}

						{isAudio && (
							<audio
								src={media.path}
								className='w-full h-full object-cover'
							/>
						)}

						{onDelete && (
							<button
								className='absolute top-0 right-0 p-2 bg-red-600 rounded-md block text-white z-20'
								onClick={() => onDelete(index)}>
								<RiDeleteBin7Fill size={20} />
							</button>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default memo(Media)
