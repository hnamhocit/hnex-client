import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { motion } from 'motion/react'
import { redirect } from 'next/navigation'
import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import FormGroup from '@/components/ui/FormGroup'
import api from '@/config/axios'
import { ToastContext } from '@/context/ToastContext'
import { useAppDispatch } from '@/store'
import { fetchUser } from '@/store/reducers/userSlice/thunks'
import { JwtToken } from '@/types/auth/jwtToken'
import { IResponse } from '@/types/response'
import { setTokens } from '@/utils/tokens'
import { validate } from '@/utils/validate'

type FormData = {
	displayName: string
	email: string
	password: string
}

const RegisterModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
		},
	})
	const { newToast } = useContext(ToastContext)
	const [disabled, setDisabled] = useState(false)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(true)
		const { data } = await api.post<IResponse<JwtToken>>(
			'auth/register',
			formData
		)

		if ('error' in data) {
			setDisabled(false)
			newToast({ type: 'error', message: data.error ?? 'Unknown error!' })
			return
		}

		reset()
		setDisabled(false)
		setTokens(data.data as JwtToken)
		dispatch(fetchUser())
		redirect('/')
	}

	return (
		<div className='text-sm flex items-center gap-3 justify-center'>
			<div>Don&apos;t hace an account? </div>

			<motion.button
				whileTap={{ scale: 0.8, opacity: 0.9 }}
				onClick={onOpen}
				className='bg-indigo-500 py-1 block px-3 rounded-full hover:bg-indigo-600 transition text-white font-medium'>
				Register!
			</motion.button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className='text-black'>Register</ModalHeader>
					<ModalBody>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='space-y-5'>
							<Controller
								control={control}
								name='displayName'
								rules={{ required: validate.required }}
								render={({ field: { value, onChange } }) => (
									<FormGroup
										value={value}
										onChange={onChange}
										label='Display Name'
										placeholder='Eg: Mr Smile...'
										className='text-black'
										errorMessage={
											errors.displayName?.message
										}
									/>
								)}
							/>

							<Controller
								control={control}
								name='email'
								rules={{
									required: validate.required,
									pattern: validate.email,
								}}
								render={({ field: { value, onChange } }) => (
									<FormGroup
										value={value}
										onChange={onChange}
										label='Email'
										placeholder='Eg: mrsmile@gmail.com...'
										className='text-black'
										errorMessage={errors.email?.message}
									/>
								)}
							/>

							<Controller
								control={control}
								name='password'
								rules={{
									required: validate.required,
									pattern: validate.password,
								}}
								render={({ field: { value, onChange } }) => (
									<FormGroup
										isPassword
										value={value}
										onChange={onChange}
										label='Password'
										placeholder='Eg: ********...'
										className='text-black'
										errorMessage={errors.password?.message}
									/>
								)}
							/>

							<Button
								disabled={disabled}
								color='primary'
								fullWidth
								radius='full'>
								Continue
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default RegisterModal
