import { IUser } from '@/interfaces/user'
import { Button, InputOtp } from '@nextui-org/react'
import { SentIcon, UserIdVerificationIcon } from 'hugeicons-react'
import { useContext, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import api from '@/config/axios'
import { ToastContext } from '@/context/ToastContext'
import { IResponse } from '@/interfaces/response'
import { useAppDispatch } from '@/store'
import { selectUser, updateUserData } from '@/store/reducers/userSlice'
import { updateUser } from '@/store/reducers/userSlice/thunks'

type FormData = {
	otp: string
}

const ActivateAccount = () => {
	const {
		reset,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		defaultValues: {
			otp: '',
		},
	})
	const [resendDisabled, setResendDisabled] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const user = useSelector(selectUser)
	const dispatch = useAppDispatch()
	const { newToast } = useContext(ToastContext)

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(false)

		const isExpired =
			Date.now() >
			new Date(
				user.data?.actionationCodeExpiredIn ?? Date.now(),
			).getTime()

		if (formData.otp !== user.data?.activationCode) {
			newToast({
				type: 'error',
				message: 'This activation code is old or wrong!',
			})

			setDisabled(false)

			return
		}

		if (isExpired) {
			newToast({
				type: 'error',
				message: 'Activation code has expired!',
			})

			await handleResencCode()

			newToast({
				message: 'We just sent you new activation code 🚀',
			})

			setDisabled(false)

			return
		}

		reset()
		setDisabled(false)
		dispatch(updateUser({ emailVerified: true }))
		newToast({
			type: 'success',
			message: 'Your account has been verified successfylly ✨',
		})
	}

	const handleResencCode = async () => {
		setResendDisabled(true)
		const { data } = await api.post<IResponse<IUser>>('mails/send-otp')
		dispatch(
			updateUserData({
				activationCode: data.data?.activationCode as string,
				actionationCodeExpiredIn:
					data.data?.actionationCodeExpiredIn ?? new Date(),
			}),
		)
		setResendDisabled(false)
	}

	return (
		<div className='h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='p-4 bg-white text-black rounded-2xl flex flex-col gap-4 items-center justify-center shadow-xl max-w-md'>
				<div className='text-2xl uppercase font-black text-primary'>
					Welcome to HNEX
				</div>

				<div className='text-sm font-medium'>
					To continue, you need to verify your account first, sorry
					for the inconvenience 🙇‍♀️🙇‍♂️🙇
				</div>

				<Controller
					name='otp'
					control={control}
					rules={{
						minLength: {
							value: 6,
							message: 'Please enter a valid OTP',
						},
					}}
					render={({ field }) => (
						<InputOtp
							length={6}
							{...field}
							errorMessage={errors.otp && errors.otp.message}
							isInvalid={!!errors.otp}
						/>
					)}
				/>

				<div className='flex items-center gap-4'>
					<Button
						type='button'
						disabled={resendDisabled}
						startContent={<SentIcon />}
						color='success'
						className='text-white'
						radius='full'>
						Resend
					</Button>

					<Button
						type='submit'
						disabled={disabled}
						startContent={<UserIdVerificationIcon />}
						color='primary'
						radius='full'>
						Activate
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ActivateAccount
