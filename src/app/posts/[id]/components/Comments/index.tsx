import { SentIcon } from 'hugeicons-react'
import moment from 'moment'
import { FC, memo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'

import BusinessCard from '@/components/ui/BusinessCard'
import ImageGallery from '@/components/ui/ImageGallery'
import TextEditor from '@/components/ui/TextEditor'
import { socket } from '@/config/socket'
import { IComment } from '@/interfaces/comment'
import { IUser } from '@/interfaces/user'
import { selectUser } from '@/store/reducers/userSlice'
import { uploadMedia } from '@/utils/uploadMedia'
import { validate } from '@/utils/validate'
import { Avatar, Button } from '@nextui-org/react'

interface CommentsProps {
	id: string | undefined
	comments: IComment[] | undefined
}

type FormData = {
	content: string
}

const Comments: FC<CommentsProps> = ({ comments, id }) => {
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
		})
		reset()
		setFiles([])
		setDisabled(false)
	}

	return (
		<>
			<div className='space-y-4'>
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

			{comments?.map((comment) => (
				<div
					key={comment.id}
					className='flex gap-4'>
					<div className='shrink-0'>
						<BusinessCard user={comment.user as IUser} />
					</div>

					<div className='flex-1 space-y-4'>
						<div className='flex items-center gap-3'>
							<div className='text-lg font-semibold'>
								{comment.user?.displayName}
							</div>
							<div className='text-sm text-gray-300'>
								@{comment.user?.username}
							</div>
							<div className='text-sm text-gray-300'>
								{moment(comment.updatedAt).fromNow()}
							</div>
						</div>

						<div className='space-y-4 rounded-2xl bg-white p-4'>
							<ImageGallery
								media={comment.media}
								className='min-h-60'
							/>

							<Markdown
								className='text-black markdown'
								remarkPlugins={[remarkGfm]}>
								{comment.content}
							</Markdown>
						</div>
					</div>
				</div>
			))}
		</>
	)
}

export default memo(Comments)
