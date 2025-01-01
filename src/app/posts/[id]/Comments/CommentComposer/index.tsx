import { SentIcon } from 'hugeicons-react'
import { FC, memo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import TextEditor from '@/components/ui/TextEditor'
import { socket } from '@/config/socket'
import { IComment } from '@/interfaces/comment'
import { selectUser } from '@/store/reducers/userSlice'
import { uploadMedia } from '@/utils/uploadMedia'
import { validate } from '@/utils/validate'
import { Avatar, Button } from '@nextui-org/react'

type FormData = {
	content: string
}

interface CommentComposerProps {
	id: string | undefined
	isReply?: boolean
	reply?: IComment
}

const CommentComposer: FC<CommentComposerProps> = ({
	id,
	isReply = false,
	reply,
}) => {
	const user = useSelector(selectUser)
	const [files, setFiles] = useState<File[]>([])
	const [disabled, setDisabled] = useState(false)

	const {
		formState: { errors },
		control,
		reset,
		handleSubmit,
	} = useForm<FormData>({
		defaultValues: {
			content: '',
		},
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<FormData> = async ({ content }) => {
		setDisabled(true)

		const mediaIds = await uploadMedia(files)

		socket.emit('comment:create', {
			content,
			mediaIds,
			userId: user.data?.id,
			postId: id,
			parentId: reply?.id ?? null,
		})
		reset()
		setFiles([])
		setDisabled(false)
	}

	return (
		<div className='space-y-4'>
			{isReply ? (
				<div className='text-gray-300'>
					Reply to{' '}
					<span className='font-semibold text-white'>
						{reply?.user?.displayName} (@{reply?.user?.username})
					</span>
				</div>
			) : (
				<div className='flex items-center gap-4'>
					<Avatar
						src={user.data?.photoURL ?? undefined}
						alt={user.data?.displayName}
					/>

					<div>
						<div className='font-semibold'>
							{user.data?.displayName}
						</div>
						<div className='text-sm text-gray-300'>
							@{user.data?.username}
						</div>
					</div>
				</div>
			)}

			<form
				className='space-y-4'
				onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name='content'
					rules={{
						required: validate.required,
						minLength: {
							value: 3,
							message: 'Minimum three characters!',
						},
					}}
					render={({ field: { value, onChange } }) => (
						<TextEditor
							value={value}
							files={files}
							setFiles={setFiles}
							setValue={onChange}
							errorMessage={errors.content?.message}
						/>
					)}
				/>

				<div className='flex items-center justify-end'>
					<Button
						disabled={disabled}
						type='submit'
						color='primary'
						radius='full'
						startContent={<SentIcon />}>
						Send
					</Button>
				</div>
			</form>
		</div>
	)
}

export default memo(CommentComposer)
