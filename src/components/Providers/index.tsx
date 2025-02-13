'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import store from '@/store'
import { HeroUIProvider } from '@heroui/react'

import Auth from './Auth'

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Provider store={store}>
				<HeroUIProvider>
					<Auth>{children}</Auth>
				</HeroUIProvider>
			</Provider>

			<ToastContainer />
		</>
	)
}

export default Providers
