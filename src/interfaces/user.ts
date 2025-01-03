import { IFollows } from "./follows";

export enum Role {
	USER = "USER",
	SELLER = "SELLER",
	ADMIN = "ADMIN",
}

export type IUser = {
	id: string;
	email: string;
	username: string;
	emailVerified: boolean;
	role: Role;
	address: string | null;
	phoneNumber: string | null;
	bio: string | null;
	displayName: string;
	refreshToken: string | null;
	password: string;
	photoURL: string | null;
	backgroundURL: string | null;
	activationCode: string | null;
	actionationCodeExpiredIn: Date | null;
	followers?: IFollows[];
	followings?: IFollows[];
	createdAt: Date;
	updatedAt: Date;
};
