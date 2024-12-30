export const roundedVariants = (length: number) => {
	switch (length) {
		case 1:
			return ['rounded-2xl']
		case 2:
			return ['rounded-l-2xl', 'rounded-r-2xl']
		case 3:
			return ['rounded-tl-2xl', 'rounded-tr-2xl', 'rounded-b-2xl']
		default:
			return [
				'rounded-tl-2xl',
				'rounded-tr-2xl',
				'rounded-bl-2xl',
				'rounded-br-2xl',
			]
	}
}
