import clsx from 'clsx'
import {
	ChangeEvent,
	FC,
	memo,
	ReactElement,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { createPortal } from 'react-dom'

interface Props {
	blobs: string[]
	onClick: () => void
	onDelete: (index: number) => void
}

interface UploadProps {
	value: File[]
	onChange: (files: File[]) => void | Promise<void>
	render: (props: Props) => ReactElement
	trigger: ReactElement
	triggerClassName?: string
	renderIn?: HTMLDivElement | null
	single?: boolean
}

const Upload: FC<UploadProps> = ({
	render,
	onChange,
	single,
	value,
	renderIn,
	trigger,
	triggerClassName,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const blobs = useMemo(() => {
		return value.map((file) => URL.createObjectURL(file))
	}, [value])

	useEffect(() => {
		return () => {
			blobs.forEach((blob) => URL.revokeObjectURL(blob))
		}
	}, [blobs])

	const onClick = () => inputRef.current?.click()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const _files = Array.from(files)
			onChange(single ? _files : [...value, ..._files])
		}
	}

	const onDelete = (index: number) => {
		onChange(value.filter((_, i) => i !== index))
	}

	const child = render({ blobs, onClick, onDelete })

	return (
		<div>
			<input
				onChange={handleChange}
				ref={inputRef}
				type='file'
				multiple={!single}
				hidden
			/>

			<div
				onClick={onClick}
				className={clsx('cursor-pointer', triggerClassName)}>
				{trigger}
			</div>

			{renderIn ? createPortal(child, renderIn) : child}
		</div>
	)
}

export default memo(Upload)
