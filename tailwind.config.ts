import { nextui } from '@nextui-org/react'

import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							foreground: '#FFF',
							DEFAULT: 'rgb(99 102 241)',
						},
					},
				},
				dark: {
					colors: {
						primary: {
							foreground: '#FFF',
							DEFAULT: 'rgb(99 102 241)',
						},
					},
				},
			},
		}),
	],
} satisfies Config
