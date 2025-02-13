import { FC, memo, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import { Button, Input, InputProps } from '@heroui/react'

const PasswordInput: FC<InputProps> = (props) => {
	const [isVisible, setIsVisible] = useState(false)

	const toggleIsVisible = () => setIsVisible((prev) => !prev)

	return (
		<Input
			{...props}
			type={isVisible ? 'text' : 'password'}
			endContent={
				<Button
					size='sm'
					radius='full'
					variant='light'
					isIconOnly
					onPress={toggleIsVisible}>
					{isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
				</Button>
			}
		/>
	)
}

export default memo(PasswordInput)
