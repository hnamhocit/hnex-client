import { IReaction } from '@/interfaces/reaction'

import { ReactionType } from '../interfaces/reaction'

export const groupByType = (reactions: IReaction[]) => {
	const types = new Map<ReactionType, IReaction[]>()

	reactions.forEach((reaction) => {
		if (!types.has(reaction.type)) {
			types.set(reaction.type, [reaction])
		} else {
			const prevReactions = types.get(reaction.type)
			types.set(reaction.type, [...(prevReactions ?? []), reaction])
		}
	})

	return types
}
