import { Comment01Icon, RepeatIcon, Share01Icon } from 'hugeicons-react'
import Link from 'next/link'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'

import { socket } from '@/config/socket'
import { IReaction } from '@/interfaces/reaction'
import { selectUser } from '@/store/reducers/userSlice'
import { Button } from '@nextui-org/react'
import NumberFlow from '@number-flow/react'

import ReactionButton from '../../ReactionButton'

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
				type,
				id: isExist.id,
			})
		else
			socket.emit('reaction:create', {
				userId: user.data?.id,
				data: { postId: id, type },
			})
	}

	return (
		<div className='flex gap-3 items-center justify-end'>
			<ReactionButton
				reactions={reactions}
				onReaction={handleReaction}
			/>

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
