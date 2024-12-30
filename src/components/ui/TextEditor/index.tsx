import {
    Delete02Icon, Image02Icon, Link01Icon, TextBoldIcon, TextItalicIcon
} from 'hugeicons-react'
import { ChangeEvent, Dispatch, FC, memo, SetStateAction, useRef } from 'react'

import { Textarea } from '@nextui-org/react'

import Upload from '../Upload'

interface TextEditorProps {
	value: string
	setValue: Dispatch<SetStateAction<string>>
	files: File[]
	setFiles: Dispatch<SetStateAction<File[]>>
	errorMessage?: string
}

const TextEditor: FC<TextEditorProps> = ({
	value,
	setValue,
	errorMessage,
	files,
	setFiles,
}) => {
	const imageRef = useRef<HTMLDivElement>(null)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const val = e.target.value
		if (val.startsWith(' ')) return
		setValue(val)
	}

	return (
		<div className='space-y-2 p-2 bg-white rounded-2xl'>
			<div className='flex items-center gap-2'>
				<button className='p-1 text-sm rounded-md text-black hover:bg-gray-200 transition'>
					<TextBoldIcon size={18} />
				</button>

				<button className='p-1 text-sm rounded-md text-black hover:bg-gray-200 transition'>
					<TextItalicIcon size={18} />
				</button>

				<button className='p-1 text-sm rounded-md text-black hover:bg-gray-200 transition'>
					<Link01Icon size={18} />
				</button>

				<Upload
					value={files}
					onChange={setFiles}
					trigger={<Image02Icon size={18} />}
					triggerClassName='p-1 text-sm rounded-md text-black hover:bg-gray-200 transition'
					renderIn={imageRef.current}
					render={({ blobs, onDelete }) => (
						<div className='grid grid-cols-3 gap-3'>
							{blobs.map((blob, i) => (
								<div
									key={blob}
									className='relative min-h-44 max-h-60 bg-cover bg-center bg-no-repeat rounded-2xl'
									style={{
										backgroundImage: `url(${blob})`,
									}}>
									<div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2'>
										<button
											onClick={() => onDelete(i)}
											className='block p-2 rounded-full bg-red-600 transition text-white'>
											<Delete02Icon size={20} />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				/>
			</div>

			<div ref={imageRef}></div>

			<Textarea
				maxRows={100}
				spellCheck='false'
				classNames={{
					inputWrapper: '!bg-transparent shadow-none',
				}}
				value={value}
				onChange={handleChange}
			/>

			<span className='text-xs font-semibold text-red-600'>
				{errorMessage}
			</span>
		</div>
	)
}

export default memo(TextEditor)
