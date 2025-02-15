import { Dispatch, FC, memo, SetStateAction, useRef, useState } from 'react'
import {
	FaBold,
	FaFileImage,
	FaLink,
	FaStrikethrough,
	FaUnderline,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectUser } from '@/store/slices/userSlice'
import { Button, Textarea } from '@heroui/react'

import Media from '../Media'
import Upload from '../Upload'

export interface TextEditorData {
	content: string
	files: File[]
	setIsDisabled: Dispatch<SetStateAction<boolean>>
	reset: () => void
}

interface TextEditorProps {
	onSubmit: (props: TextEditorData) => Promise<void>
}

const TextEditor: FC<TextEditorProps> = ({ onSubmit }) => {
	const [blobs, setBlobs] = useState<string[]>([])
	const [files, setFiles] = useState<File[]>([])
	const [content, setContent] = useState('')
	const [isDisabled, setIsDisabled] = useState(false)
	const topRef = useRef<HTMLDivElement>(null)
	const user = useSelector(selectUser)

	const reset = () => {
		setContent('')
		setFiles([])
		setBlobs([])
	}

	return (
		<div className='p-4 space-y-2'>
			<div ref={topRef}></div>

			<Textarea
				content={content}
				spellCheck={false}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder={`What happening now?`}
			/>

			<div className='flex justify-between'>
				<div className='flex items-center gap-3'>
					<Upload
						place={topRef.current as Element}
						setFiles={setFiles}
						blobs={blobs}
						setBlobs={setBlobs}
						trigger={<FaFileImage size={16} />}
						render={({ onDelete }) => (
							<Media
								data={blobs.map((blob, i) => ({
									id: i,
									content_type: files[i].type,
									path: blob,
									size: files[i].size,
									name: files[i].name,
									user_id: user?.id as number,
								}))}
								onDelete={onDelete}
							/>
						)}
					/>

					<Button
						isIconOnly
						radius='full'
						variant='light'
						size='sm'>
						<FaUnderline size={16} />
					</Button>

					<Button
						isIconOnly
						radius='full'
						variant='light'
						size='sm'>
						<FaBold size={16} />
					</Button>

					<Button
						isIconOnly
						radius='full'
						variant='light'
						size='sm'>
						<FaStrikethrough size={16} />
					</Button>

					<Button
						isIconOnly
						radius='full'
						variant='light'
						size='sm'>
						<FaLink size={16} />
					</Button>
				</div>

				{content.length > 0 && (
					<Button
						onPress={() =>
							onSubmit({
								files,
								content,
								setIsDisabled,
								reset,
							})
						}
						disabled={isDisabled}
						isLoading={isDisabled}
						color='primary'
						radius='full'>
						Post
					</Button>
				)}
			</div>
		</div>
	)
}

export default memo(TextEditor)
