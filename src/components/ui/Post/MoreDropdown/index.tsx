import {
	Delete01Icon,
	MoreVerticalCircle02Icon,
	PencilEdit01Icon,
	RepeatIcon,
	Share01Icon,
} from 'hugeicons-react'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'

import Dropdown from '@/components/ui/Dropdown'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { socket } from '@/config/socket'
import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'

interface MoreDropdownProps {
	user?: IUser
	id: string
}

const MoreDropdown: FC<MoreDropdownProps> = ({ id, user }) => {
	const me = useSelector(selectUser)

	const handleDelete = () => socket.emit('post:delete', { id })

	return (
		<Dropdown trigger={<MoreVerticalCircle02Icon size={24} />}>
			<DropdownItem>
				<Share01Icon /> Share
			</DropdownItem>

			<DropdownItem>
				<RepeatIcon />
				Repost
			</DropdownItem>

			{user?.id === me.data?.id && (
				<>
					<DropdownItem>
						<PencilEdit01Icon />
						Edit
					</DropdownItem>

					<DropdownItem
						onClick={handleDelete}
						className='hover:bg-red-600 hover:text-white'>
						<Delete01Icon /> Delete
					</DropdownItem>
				</>
			)}
		</Dropdown>
	)
}

export default memo(MoreDropdown)
