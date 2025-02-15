import {
	ChangeEvent,
	Dispatch,
	FC,
	memo,
	ReactElement,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from 'react'
import { createPortal } from 'react-dom'

interface RenderProps {
	onDelete: (index: number) => void
	blobs: string[]
}

interface UploadProps {
	trigger: ReactNode
	triggerClassName?: string
	blobs: string[]
	setBlobs: Dispatch<SetStateAction<string[]>>
	setFiles: Dispatch<SetStateAction<File[]>>
	render: (props: RenderProps) => ReactElement
	place?: Element
}

const Uploads: FC<UploadProps> = ({
	trigger,
	triggerClassName,
	setFiles,
	render,
	blobs,
	setBlobs,
	place,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		return () => {
			blobs.forEach((blob) => URL.revokeObjectURL(blob))
		}
	}, [blobs])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const _files = Array.from(files)
			const blobs = _files.map((file) => URL.createObjectURL(file))
			setFiles((prev) => [...prev, ..._files])
			setBlobs((prev) => [...prev, ...blobs])
		}
	}

	const handleDelete = useCallback(
		(index: number) => {
			setBlobs((prev) => prev.filter((_, i) => i !== index))
			setFiles((prev) => prev.filter((_, i) => i !== index))
		},
		[setFiles, setBlobs],
	)

	const child = render({ onDelete: handleDelete, blobs })

	return (
		<>
			{place ? createPortal(child, place) : child}

			<input
				hidden
				ref={inputRef}
				type='file'
				multiple
				onChange={handleChange}
			/>

			<button
				className={triggerClassName}
				onClick={() => inputRef.current?.click()}>
				{trigger}
			</button>
		</>
	)
}

export default memo(Uploads)
