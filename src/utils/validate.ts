export const validate = {
	required: {
		value: true,
		message: 'This field is required!',
	},
	email: {
		value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
		message: 'Please enter a valid email!',
	},
	password: {
		value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
		message:
			'Password has minimum 8 characters, 1 upper, 1 lower, 1 number and 1 special character!',
	},
}
