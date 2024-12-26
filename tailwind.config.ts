import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							foreground: "#FFF",
							DEFAULT: "rgb(99 102 241)",
						},
					},
				},
				dark: {
					colors: {
						primary: {
							foreground: "#FFF",
							DEFAULT: "rgb(99 102 241)",
						},
					},
				},
			},
		}),
	],
} satisfies Config;
