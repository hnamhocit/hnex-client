'use client'

import Link from 'next/link'
import { FaSearch, FaUser } from 'react-icons/fa'
import { IoIosAddCircle, IoMdNotifications } from 'react-icons/io'
import { IoSettings } from 'react-icons/io5'
import { TbLogout } from 'react-icons/tb'

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
} from '@heroui/react'

const Header = () => {
	return (
		<div className='px-4 h-16 bg-white border-b shadow-sm flex items-center justify-between'>
			<Link
				href='/'
				className='text-lg font-bold text-blue-500'>
				HNEX
			</Link>

			<div className='flex items-center gap-3'>
				<Button
					isIconOnly
					radius='full'
					variant='flat'>
					<FaSearch />
				</Button>

				<Button
					isIconOnly
					radius='full'
					variant='flat'>
					<IoIosAddCircle size={20} />
				</Button>

				<Button
					isIconOnly
					radius='full'
					variant='flat'>
					<IoMdNotifications size={20} />
				</Button>

				<Dropdown>
					<DropdownTrigger>
						<Image
							src='https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg'
							alt='User Avatar'
							width={44}
							height={44}
							className='object-cover rounded-full'
						/>
					</DropdownTrigger>

					<DropdownMenu>
						<DropdownItem
							startContent={<FaUser />}
							key='profile'>
							Profile
						</DropdownItem>

						<DropdownItem
							startContent={<IoSettings />}
							key='settings'>
							Settings
						</DropdownItem>

						<DropdownItem
							className='text-red-600'
							color='danger'
							startContent={<TbLogout />}
							key='logout'>
							Logout
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	)
}

export default Header
