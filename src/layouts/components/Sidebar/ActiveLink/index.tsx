import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, memo } from 'react'

import { Page } from '..'

const ActiveLink: FC<Page> = ({ content, href, icon }) => {
	const path = usePathname()

	return (
		<Link
			href={href}
			className={clsx(
				'flex items-center gap-3 p-3 hover:scale-105 rounded-2xl hover:bg-indigo-500 hover:text-white transition',
				{
					'bg-indigo-500 text-white': path === href,
				}
			)}>
			{icon}
			{content}
		</Link>
	)
}

export default memo(ActiveLink)
