import api from '@/config/axios'
import { IMedia } from '@/interfaces/media'
import { IResponse } from '@/interfaces/response'

export const uploadMedia = async (files: File[]) => {
	const mediaIds = await Promise.all(
		files.map(async (file) => {
			const _file = new FormData()
			_file.append('file', file)

			const { data } = await api.post<IResponse<IMedia>>(
				'media/upload',
				_file,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			)

			return data.data?.id
		}),
	)

	return mediaIds
}
