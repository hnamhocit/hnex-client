import { FavouriteIcon } from 'hugeicons-react'
import { motion } from 'motion/react'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IReaction, ReactionType } from '@/interfaces/reaction'
import { selectUser } from '@/store/reducers/userSlice'
import { Button, ButtonProps, Image } from '@nextui-org/react'

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

interface ReactionButtonProps extends ButtonProps {
	reactions: IReaction[] | undefined
	onReaction: (type: ReactionType) => void
}

const ReactionButton: FC<ReactionButtonProps> = ({
	reactions,
	onReaction,
	...props
}) => {
	const user = useSelector(selectUser)

	const isReactioned = reactions?.find((r) => r.user?.id === user.data?.id)

	return (
		<ReactionContainer className='relative h-8'>
			<Button
				{...props}
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
						onClick={async () =>
							onReaction(type.toUpperCase() as ReactionType)
						}
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
	)
}

export default memo(ReactionButton)
