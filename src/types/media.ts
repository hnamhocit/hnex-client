export enum MediaType {
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
	FILE = 'FILE',
}

export type Media = {
	name: string
	id: string
	buffer: Uint8Array
	contentType: string
	size: number
	type: MediaType
	userId: string
	createdAt: Date
	updatedAt: Date
}
