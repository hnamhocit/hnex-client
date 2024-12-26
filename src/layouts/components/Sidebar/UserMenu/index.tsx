import { Avatar } from '@nextui-org/react'
import {
	DangerIcon,
	Logout01Icon,
	Profile02Icon,
	Settings01Icon,
} from 'hugeicons-react'
import { useSelector } from 'react-redux'

import Dropdown from '@/components/ui/Dropdown'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { useAppDispatch } from '@/store'
import { selectUser } from '@/store/reducers/userSlice'
import { deleteUser, userLogout } from '@/store/reducers/userSlice/thunks'
import { redirect } from 'next/navigation'

const UserMenu = () => {
	const user = useSelector(selectUser)
	const dispatch = useAppDispatch()

	const items = {
		actions: {
			title: 'Actions',
			items: [
				{
					onClick: () => redirect(`/profile/${user.data?.id}`),
					content: 'Profile',
					startContent: <Profile02Icon />,
				},
				{
					onClick: () => redirect('/settings'),
					content: 'Settings',
					startContent: <Settings01Icon />,
				},
			],
		},
		dangerZone: {
			title: 'Danger Zone',
			items: [
				{
					content: 'Logout',
					startContent: <Logout01Icon />,
					className: 'text-danger',
					color: 'danger',
					onClick: () => dispatch(userLogout()),
				},
				{
					content: 'Delete account',
					startContent: <DangerIcon />,
					className: 'text-danger',
					color: 'danger',
					onClick: () => dispatch(deleteUser),
				},
			],
		},
	}

	return (
		<Dropdown
			position='bottom-left'
			triggerClassName='text-left'
			trigger={
				<>
					<Avatar
						src={user.data?.photoURL}
						alt={user.data?.displayName}
					/>

					<div>
						<div className='font-semibold'>
							Hi, {user.data?.displayName} 👋
						</div>
						<div className='text-gray-500 text-sm'>
							How are you today?
						</div>
					</div>
				</>
			}>
			{Object.entries(items).map((entry) => (
				<div key={entry[0]} className='space-y-3'>
					<div className='text-sm text-gray-500'>
						{entry[1].title}
					</div>

					{entry[1].items.map((item, i) => (
						<DropdownItem
							key={i}
							onClick={item.onClick}
							className={`${
								entry[0] === 'dangerZone'
									? 'text-red-600 hover:bg-red-600 hover:text-white'
									: undefined
							}`}>
							{item.startContent}
							{item.content}
						</DropdownItem>
					))}
				</div>
			))}
		</Dropdown>
	)
}

export default UserMenu
