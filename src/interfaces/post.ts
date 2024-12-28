import { IComment } from "./comment";
import { IMedia } from "./media";
import { IReaction } from "./reaction";
import { IUser } from "./user";

export type IPost = {
	id: string;
	content: string;
	media: IMedia[];
	user?: IUser;
	reactions?: IReaction[];
	comments?: IComment[];
	_count?: {
		comments: number;
	};
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};
