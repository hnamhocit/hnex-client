'use client'

import { AxiosError } from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { z } from 'zod'

import PasswordInput from '@/components/PasswordInput'
import api from '@/config/api'
import { setUser } from '@/store/slices/userSlice'
import { Button, Image, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		),
})

const Enter = () => {
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

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsDisabled(true)

		try {
			await api.post('/auth/login', {
				email: values.email,
				password: values.password,
			})

			const response = await api.get('/users/profile')
			dispatch(setUser(response.data))
			toast.success('Logged in successfully 😎')
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
		<div className='min-h-screen flex items-center justify-center'>
			<div className='w-full py-4 bg-white max-w-xs space-y-4'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full py-4 bg-white max-w-xs space-y-4'>
					<h1 className='text-3xl font-bold text-center'>Login</h1>

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

					<div className='flex items-center gap-3'>
						<div className='h-[2px] flex-1 rounded-full bg-gray-100'></div>
						<div className='shrink-0 font-medium'>OR</div>
						<div className='h-[2px] flex-1 rounded-full bg-gray-100'></div>
					</div>

					<div className='flex justify-between gap-3'>
						<Button
							startContent={
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png'
									alt='Google'
									width={24}
									height={24}
								/>
							}
							fullWidth
							variant='faded'>
							<span className='text-gray-700 font-medium'>
								Google
							</span>
						</Button>

						<Button
							startContent={
								<Image
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png'
									alt='Facebook'
									width={24}
									height={24}
								/>
							}
							fullWidth
							variant='faded'>
							<span className='text-gray-700 font-medium'>
								Facebook
							</span>
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Enter
