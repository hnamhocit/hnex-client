'use client'

import Story from './Story'

const Stories = () => {
	return (
		<div className='flex overflow-x-scroll p-4 border-y-2 overflow-y-hidden gap-3'>
			<Story />
			<Story />
			<Story />
			<Story />
		</div>
	)
}

export default Stories
