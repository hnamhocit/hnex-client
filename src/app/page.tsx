'use client'

import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import Header from '@/components/Header'
import Posts from '@/components/Posts'
import Stories from '@/components/Stories'
import TextEditor, { TextEditorData } from '@/components/TextEditor'
import api from '@/config/api'

export default function Home() {
	const handleSubmit = async ({
		setIsDisabled,
		content,
		files,
		reset,
	}: TextEditorData) => {
		setIsDisabled(true)
		const formData = new FormData()
		files.forEach((file) => formData.append('files', file))
		formData.append('content', content)

		try {
			await api.post('/posts/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			reset()
			setIsDisabled(false)
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.error)
			}

			console.log(error)
			setIsDisabled(false)
		}
	}

	return (
		<>
			<Header />

			<TextEditor onSubmit={handleSubmit} />

			<Stories />

			<Posts />
		</>
	)
}
