import { AxiosError } from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'

import PasswordInput from '@/components/PasswordInput'
import api from '@/config/api'
import { setUser } from '@/store/slices/userSlice'
import { setTokens } from '@/utils/jwt'
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		),
	displayName: z.string().min(4).max(30),
})

const RegisterModal = () => {
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})
	const [isDisabled, setIsDisabled] = useState(false)
	const dispatch = useDispatch()
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsDisabled(true)

		try {
			const tokens = await api.post('/auth/register', {
				email: values.email,
				password: values.password,
				displayName: values.displayName,
			})
			setTokens(tokens.data.access_token, tokens.data.refresh_token)
			const profile = await api.get('/users/profile')
			dispatch(setUser(profile.data))
			reset()
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				toast.error(`Error: ${error.response.data.error}`)
			} else {
				toast.error('An unexpected error occurred!')
			}
		}

		setIsDisabled(false)
	}

	return (
		<>
			<button
				type='button'
				onClick={onOpen}
				className='underline text-blue-600 font-semibold'>
				Register
			</button>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>Register</ModalHeader>
					<ModalBody>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-5'>
							<Controller
								control={control}
								name='displayName'
								render={({ field }) => (
									<Input
										{...field}
										label='Display Name'
										isInvalid={
											!!errors.displayName?.message
										}
										errorMessage={
											errors.displayName?.message
										}
										radius='full'
										size='sm'
									/>
								)}
							/>

							<Controller
								control={control}
								name='email'
								render={({ field }) => (
									<Input
										{...field}
										label='Email'
										isInvalid={!!errors.email?.message}
										errorMessage={errors.email?.message}
										radius='full'
										size='sm'
									/>
								)}
							/>

							<Controller
								control={control}
								name='password'
								render={({ field }) => (
									<PasswordInput
										{...field}
										label='Password'
										isInvalid={!!errors.password?.message}
										errorMessage={errors.password?.message}
										radius='full'
										size='sm'
									/>
								)}
							/>

							<Button
								type='submit'
								disabled={isDisabled}
								isLoading={isDisabled}
								fullWidth
								color='primary'
								variant='solid'
								radius='full'>
								Continue
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default RegisterModal
