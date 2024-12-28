import { IPost } from "./post";
import { IUser } from "./user";

export type IComment = {
	id: string;
	parentCommentId: string | null;
	content: string;
	postId: string;
	post?: IPost;
	userId: string;
	user?: IUser;
	createdAt: Date;
	updatedAt: Date;
};
