import { FC, memo } from 'react'

import { IReaction } from '@/interfaces/reaction'
import { groupByType } from '@/utils/groupByType'
import { Image } from '@nextui-org/react'
import NumberFlow from '@number-flow/react'

interface ReactionsProps {
	reactions: IReaction[] | undefined
}

const UserReactions: FC<ReactionsProps> = ({ reactions }) => {
	const keys = Array.from(groupByType(reactions ?? []).keys())

	const twoNames = reactions
		?.slice(0, 2)
		.map(
			(r) =>
				r.user?.displayName.split(' ')[
					r.user.displayName.split(' ').length - 1
				],
		)
		.join(', ')

	return (
		<div className='flex items-center gap-3'>
			<div className='flex items-center gap-1'>
				{keys.map((key) => {
					return (
						<Image
							src={`/reactions/${key.toLowerCase()}.jpg`}
							key={key}
							alt={key}
							width={16}
							height={16}
						/>
					)
				})}
			</div>

			{reactions && (
				<div className='text-sm font-medium'>
					{twoNames}
					{reactions.length > 2 && (
						<span>
							and <NumberFlow value={reactions.length - 2} />{' '}
							others
						</span>
					)}
				</div>
			)}
		</div>
	)
}

export default memo(UserReactions)
