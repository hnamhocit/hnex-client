import { useContext } from 'react'

import { ToastContext } from '@/context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
	const { toasts } = useContext(ToastContext)

	return (
		<div
			className='w-80 p-4 fixed z-[9999] top-0 right-0 h-full flex flex-col gap-5'
			style={{
				visibility: toasts.length > 0 ? 'visible' : 'hidden',
			}}>
			{toasts.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</div>
	)
}

export default ToastContainer
