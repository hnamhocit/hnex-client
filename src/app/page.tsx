'use client'

import { FaImage } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

import Header from '@/components/Header'
import Posts from '@/components/Posts'
import Stories from '@/components/Stories'
import { selectUser } from '@/store/slices/userSlice'
import { Avatar, Button, Input } from '@heroui/react'

export default function Home() {
	const user = useSelector(selectUser)

	return (
		<>
			<Header />

			<div className='p-4 flex items-center gap-3'>
				<Input
					radius='full'
					placeholder={`What happening now?`}
					variant='flat'
					endContent={
						<Button
							isIconOnly
							variant='light'
							radius='full'>
							<FaImage size={20} />
						</Button>
					}
				/>

				<div className='shrink-0'>
					<Avatar
						src={user?.photo_url ?? ''}
						alt={user?.display_name}
					/>
				</div>
			</div>

			<Stories />

			<Posts />
		</>
	)
}
