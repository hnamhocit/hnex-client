import { PencilEdit01Icon } from 'hugeicons-react'
import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { socket } from '@/config/socket'
import { ToastContext } from '@/context/ToastContext'
import { selectUser } from '@/store/reducers/userSlice'
import { uploadMedia } from '@/utils/uploadMedia'
import { validate } from '@/utils/validate'
import {
    Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure
} from '@nextui-org/react'

import MediaUpload from './MediaUpload'

type FormData = {
	content: string
}

const CreatePostModal = () => {
	const {
		formState: { errors },
		control,
		handleSubmit,
		reset,
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			content: '',
		},
	})
	const [files, setFiles] = useState<File[]>([])
	const [disabled, setDisabled] = useState(false)
	const { newToast } = useContext(ToastContext)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const user = useSelector(selectUser)

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(true)

		const videos = files.filter(
			(file) => file.type.split('/')[0] === 'video',
		)

		if (videos.length > 1 || (videos.length === 1 && files.length > 1)) {
			setDisabled(false)
			newToast({ type: 'error', message: 'Maximum one video per post!' })
			return
		}

		const mediaIds = await uploadMedia(files)

		socket.emit('post:create', {
			data: { content: formData.content, mediaIds },
			userId: user.data?.id,
		})

		reset()
		setFiles([])
		setDisabled(false)
		newToast({ message: 'Post created successfully ✨!', type: 'success' })
	}

	return (
		<>
			<Button
				onPress={onOpen}
				size='lg'
				radius='lg'
				startContent={<PencilEdit01Icon />}
				fullWidth
				color='primary'>
				What happening?!
			</Button>

			<Modal
				scrollBehavior='inside'
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className='text-black'>
						Create post
					</ModalHeader>

					<ModalBody>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-7 text-black'>
							<Controller
								control={control}
								name='content'
								rules={{ required: validate.required }}
								render={({ field }) => (
									<div className='space-y-2'>
										<Textarea
											placeholder='Content here...'
											{...field}
											maxLength={100}
											spellCheck='false'
											classNames={{
												inputWrapper:
													'pl-0 shadow-none !bg-transparent',
												input: 'no-scrollbar',
											}}
										/>

										<div className='text-xs text-red-600 font-semibold'>
											{errors.content?.message}
										</div>
									</div>
								)}
							/>

							<MediaUpload
								files={files}
								setFiles={setFiles}
							/>

							<Button
								fullWidth
								disabled={disabled}
								color='primary'
								radius='full'
								type='submit'>
								Continue
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CreatePostModal
