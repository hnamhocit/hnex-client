import { UserLove01Icon, UserStar01Icon } from 'hugeicons-react'
import Link from 'next/link'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'
import { formatNumber } from '@/utils/formatNumber'
import { Avatar, AvatarProps, Button } from '@nextui-org/react'

const CardContainer = styled(Link)`
	.content {
		visibility: hidden;
		transform: translateY(-8px);
		opacity: 0;
	}

	&:hover .content {
		visibility: visible;
		transform: translateY(8px);
		opacity: 1;
	}
`

interface BusinessCardProps extends AvatarProps {
	user: IUser | undefined
}

const BusinessCard: FC<BusinessCardProps> = ({ user, ...props }) => {
	const me = useSelector(selectUser)

	return (
		<CardContainer
			href={`/users/${user?.id}`}
			className='relative cursor-pointer'>
			<Avatar
				{...props}
				src={user?.photoURL ?? undefined}
				alt={user?.displayName}
			/>

			<div className='content absolute text-black bg-white border z-20 top-full left-0 min-w-80 p-4 rounded-2xl shadow-xl transition-all min-h-20 space-y-3'>
				<div className='flex items-center justify-between'>
					<Avatar
						size='lg'
						src={user?.photoURL ?? ''}
						alt={user?.displayName}
					/>

					{user?.id !== me.data?.id && (
						<Button
							radius='full'
							color='primary'>
							{user?.followers?.filter(
								(follow) => follow.followedById === me.data?.id,
							)
								? 'Un follow'
								: 'Follow'}
						</Button>
					)}
				</div>

				<div className='text-xl font-bold'>
					{me.data?.id === user?.id ? 'You' : user?.displayName}
				</div>

				<div className='text-gray-300'>{user?.bio}</div>

				<div className='flex items-center gap-2 text-sm transition-all hover:text-primary'>
					<span className='font-bold'>
						{formatNumber(user?.followers?.length ?? 0)}
					</span>
					Followers
					<UserStar01Icon size={18} />
				</div>

				<div className='flex items-center gap-2 text-sm transition-all hover:text-primary'>
					<span className='font-bold'>
						{formatNumber(user?.followings?.length ?? 0)}
					</span>
					Followings
					<UserLove01Icon size={18} />
				</div>
			</div>
		</CardContainer>
	)
}

export default memo(BusinessCard)
