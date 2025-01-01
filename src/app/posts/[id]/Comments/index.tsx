import { FC, memo } from 'react'

import { IComment } from '@/interfaces/comment'
import { buildCommentTree } from '@/utils/buildCommentTree'

import Comment from './Comment'
import CommentComposer from './CommentComposer'

interface CommentsProps {
	id: string | undefined
	comments: IComment[] | undefined
}

const Comments: FC<CommentsProps> = ({ comments, id }) => {
	const _comments = buildCommentTree(comments as IComment[])

	return (
		<>
			<CommentComposer id={id} />

			{_comments.map((comment) => (
				<Comment
					user={comment.user}
					comment={comment}
					id={id}
					key={comment.id}
				/>
			))}
		</>
	)
}

export default memo(Comments)
