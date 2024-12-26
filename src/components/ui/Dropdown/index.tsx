import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react'

interface DropdownProps {
	children: ReactNode
	trigger: ReactNode
	triggerClassName?: string
	className?: string
	menuClassName?: string
	position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
}

const Dropdown: FC<DropdownProps> = ({
	children,
	trigger,
	triggerClassName,
	className,
	menuClassName,
	position = 'top-right',
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const [isOpen, setIsOpen] = useState(false)

	const toggleIsOpen = () => setIsOpen((prev) => !prev)
	const [y, x] = position.split('-')

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!ref.current?.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}

		window.addEventListener('click', handleClickOutside)

		return () => window.removeEventListener('click', handleClickOutside)
	}, [])

	return (
		<div ref={ref} className={clsx('relative', className)}>
			<motion.button
				whileTap={{ scale: 0.8, opacity: 0.8 }}
				onClick={toggleIsOpen}
				className={clsx(
					'flex items-center justify-center w-full gap-3',
					triggerClassName
				)}>
				{trigger}
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={menuRef}
						initial={{
							opacity: 0,
							translateY: y === 'top' ? -8 : 8,
						}}
						animate={{
							opacity: 1,
							translateY: y === 'top' ? 8 : -8,
						}}
						exit={{
							opacity: 0,
							translateY: y === 'top' ? -8 : 8,
						}}
						className={clsx(
							'absolute min-h-60 min-w-60 rounded-2xl shadow-xl bg-[rgb(55,65,81,.5)] backdrop-blur-md space-y-3 p-4 z-20',
							menuClassName,
							{
								'right-0': x === 'right',
								'top-full': y === 'top',
								'left-0': x === 'left',
								'bottom-full': y === 'bottom',
							}
						)}>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(Dropdown)
