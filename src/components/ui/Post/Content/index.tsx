import { FC, memo, RefObject } from 'react'

import { IPost } from '@/interfaces/post'
import { getMediaURL } from '@/utils/getUploadURL'

import ImageGallery from '../../ImageGallery'
import Video from '../../Video'
import Actions from '../Actions'
import Author from '../Author'
import Reactions from '../Reactions'

interface ContentProps {
	post: IPost
	isDetail: boolean
	ref: RefObject<HTMLDivElement | null>
}

const Content: FC<ContentProps> = ({
	post: { createdAt, updatedAt, user, content, media, id, reactions, _count },
	ref,
	isDetail,
}) => {
	return (
		<div
			ref={ref}
			className='flex flex-col cursor-default gap-4 flex-1'>
			{!isDetail && (
				<Author
					user={user}
					isDetail={isDetail}
					createdAt={createdAt}
					updatedAt={updatedAt}
				/>
			)}

			<div>{content}</div>

			{media.length > 0 &&
			media[0].contentType.split('/')[0] === 'video' ? (
				<Video src={getMediaURL(media[0].id)} />
			) : (
				<ImageGallery
					media={media}
					className='min-h-60'
				/>
			)}

			<Reactions reactions={reactions} />

			{!isDetail && (
				<Actions
					id={id}
					reactions={reactions}
					_count={_count}
				/>
			)}
		</div>
	)
}

export default memo(Content)
