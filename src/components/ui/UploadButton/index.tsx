import clsx from 'clsx'
import { CloudUploadIcon } from 'hugeicons-react'
import { FC, memo } from 'react'

interface UploadButtonProps {
	className?: string
}

const UploadButton: FC<UploadButtonProps> = ({ className }) => {
	return (
		<button
			type='button'
			className={clsx(
				'flex flex-col w-full rounded-2xl text-white items-center justify-center gap-3 min-h-44 bg-primary transition',
				className,
			)}>
			<CloudUploadIcon size={50} />
			<div className='text-xl font-semibold'>Upload</div>
			<div className='text-sm'>
				Click here or drag and drop to upload files
			</div>
		</button>
	)
}

export default memo(UploadButton)
