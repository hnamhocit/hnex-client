import clsx from 'clsx'
import { Edit01Icon, GlobalIcon } from 'hugeicons-react'
import moment from 'moment'
import Link from 'next/link'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'

import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'

interface AuthorProps {
	user: IUser | undefined
	isDetail: boolean
	createdAt: Date
	updatedAt: Date
}

const Author: FC<AuthorProps> = ({ user, isDetail, createdAt, updatedAt }) => {
	const me = useSelector(selectUser)
	const isChanged =
		new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 0

	return (
		<div className='space-y-2'>
			<Link
				href={`/users/${user?.id}`}
				className='flex items-center gap-2'>
				<div
					className={clsx(
						'font-semibold leading-none',
						isDetail && 'text-xl',
					)}>
					{user?.id === me.data?.id ? 'You' : user?.displayName}
				</div>

				<div
					className={clsx(
						'text-sm leading-none font-medium',
						isDetail ? 'text-gray-300' : 'text-gray-700',
					)}>
					@{user?.username}
				</div>
			</Link>

			<div
				className={clsx(
					'flex leading-none items-center gap-1 text-sm',
					isDetail ? 'text-gray-300' : 'text-gray-700',
				)}>
				{isChanged ? <Edit01Icon /> : <GlobalIcon size={14} />}

				{moment(isChanged ? updatedAt : createdAt).fromNow()}
			</div>
		</div>
	)
}

export default memo(Author)
