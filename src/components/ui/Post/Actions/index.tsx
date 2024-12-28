import {
	Comment01Icon,
	FavouriteIcon,
	RepeatIcon,
	Share01Icon,
} from 'hugeicons-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { socket } from '@/config/socket'
import { IReaction } from '@/interfaces/reaction'
import { selectUser } from '@/store/reducers/userSlice'
import { Button, Image } from '@nextui-org/react'
import NumberFlow from '@number-flow/react'

const types = ['like', 'heart', 'smile', 'surprise', 'angry', 'cry']

const ReactionContainer = styled.div`
	.content {
		visibility: hidden;
		opacity: 0;
		scale: 0;
	}

	&:hover .content {
		visibility: visible;
		opacity: 1;
		scale: 1;
	}
`

interface ActionsProps {
	id: string
	reactions?: IReaction[]
	_count?: {
		comments: number
	}
}

const Actions: FC<ActionsProps> = ({ id, reactions, _count }) => {
	const user = useSelector(selectUser)

	const handleReaction = (type: string) => {
		const isExist = reactions?.find((r) => r.user?.id === user.data?.id)

		if (isExist)
			socket.emit('reaction:update', {
				type: type.toUpperCase(),
				id: isExist.id,
			})
		else
			socket.emit('reaction:create', {
				userId: user.data?.id,
				data: { postId: id, type: type.toUpperCase() },
			})
	}

	const isReactioned = reactions?.find((r) => r.user?.id === user.data?.id)

	return (
		<div className='flex gap-3 items-center justify-end'>
			<ReactionContainer className='relative'>
				<Button
					size='sm'
					startContent={
						isReactioned ? (
							<Image
								width={20}
								height={20}
								src={`/reactions/${isReactioned.type.toLowerCase()}.jpg`}
								alt={isReactioned.type}
							/>
						) : (
							<FavouriteIcon />
						)
					}
					radius='full'
					variant='light'>
					{isReactioned ? isReactioned.type : 'Like'}
				</Button>

				<div className='absolute min-w-80 min-h-20 left-1/2 bottom-full -translate-x-1/2 content flex items-center gap-4 transition-all z-10 bg-white rounded-2xl shadow-md p-4'>
					{types.map((type) => (
						<motion.button
							onClick={async () => handleReaction(type)}
							key={type}
							whileTap={{ scale: 0.9 }}
							whileHover={{ scale: 1.2 }}>
							<Image
								src={`/reactions/${type}.jpg`}
								alt={type}
								width={32}
								height={32}
								className='object-cover'
							/>
						</motion.button>
					))}
				</div>
			</ReactionContainer>

			<Link href={`/posts/${id}`}>
				<Button
					startContent={<Comment01Icon />}
					variant='light'
					size='sm'
					radius='full'>
					<NumberFlow value={_count?.comments ?? 0} />
				</Button>
			</Link>

			<Button
				startContent={<Share01Icon />}
				variant='light'
				size='sm'
				radius='full'>
				<NumberFlow value={1e6} />
			</Button>

			<Button
				startContent={<RepeatIcon />}
				variant='light'
				size='sm'
				radius='full'>
				<NumberFlow value={1e6} />
			</Button>
		</div>
	)
}

export default memo(Actions)
