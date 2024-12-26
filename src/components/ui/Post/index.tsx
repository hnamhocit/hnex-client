import { Avatar, Button } from "@nextui-org/react";
import {
	Comment01Icon,
	Delete01Icon,
	Edit01Icon,
	FavouriteIcon,
	GlobalIcon,
	MoreVerticalCircle02Icon,
	PencilEdit01Icon,
	RepeatIcon,
	Share01Icon,
} from "hugeicons-react";
import moment from "moment";
import { FC, memo } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "@/store/reducers/userSlice";
import { MediaType } from "@/types/media";
import type { Post } from "@/types/post";
import { User } from "@/types/user";
import { formatNumber } from "@/utils/formatNumber";
import { getMediaURL } from "@/utils/getUploadURL";
import BusinessCard from "../BusinessCard";
import Dropdown from "../Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";
import ImageGallery from "../ImageGallery";
import Video from "../Video";

interface PostProps {
	post: Post;
	onDelete: (id: string) => void | Promise<void>;
}

const Post: FC<PostProps> = ({
	post: { id, user, updatedAt, createdAt, content, media, _count, reactions },
	onDelete,
}) => {
	const me = useSelector(selectUser);

	const isChanged =
		new Date(updatedAt).getTime() - new Date(createdAt).getTime() > 0;

	return (
		<div className="flex flex-col gap-4 text-black p-4 border bg-white rounded-2xl shadow-md text-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<BusinessCard user={user as User}>
						<Avatar
							src={user?.photoURL ?? ""}
							alt={user?.displayName}
						/>
					</BusinessCard>

					<div>
						<div className="font-semibold">{user?.displayName}</div>
						<div className="flex items-center gap-1 text-sm text-gray-500">
							{isChanged ? (
								<Edit01Icon />
							) : (
								<GlobalIcon size={14} />
							)}

							{moment(isChanged ? updatedAt : createdAt).format(
								"DD/MM/YYYY"
							)}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<Dropdown trigger={<MoreVerticalCircle02Icon size={24} />}>
						<DropdownItem>
							<Share01Icon /> Share
						</DropdownItem>

						<DropdownItem>
							<RepeatIcon />
							Repost
						</DropdownItem>

						{user?.id === me.data?.id && (
							<>
								<DropdownItem className="font-semibold">
									<PencilEdit01Icon />
									Edit
								</DropdownItem>

								<DropdownItem
									onClick={() => onDelete(id)}
									className="hover:bg-red-600 hover:text-white font-semibold"
								>
									<Delete01Icon /> Delete
								</DropdownItem>
							</>
						)}
					</Dropdown>
				</div>
			</div>

			<div>{content}</div>

			{media.length > 0 && media[0].type === MediaType.VIDEO ? (
				<Video src={getMediaURL(media[0].id)} />
			) : (
				<div className="grid grid-cols-2 gap-3">
					<ImageGallery
						media={media}
						className="min-h-60 rounded-2xl"
					/>
				</div>
			)}

			<div className="flex gap-3 items-center justify-end">
				<Button
					startContent={<FavouriteIcon />}
					variant="light"
					size="sm"
					radius="full"
				>
					{formatNumber(reactions?.length ?? 0)}
				</Button>

				<Button
					startContent={<Comment01Icon />}
					variant="light"
					size="sm"
					radius="full"
				>
					{formatNumber(_count?.comments ?? 0)}
				</Button>

				<Button
					startContent={<Share01Icon />}
					variant="light"
					size="sm"
					radius="full"
				>
					{formatNumber(1234)}
				</Button>

				<Button
					startContent={<RepeatIcon />}
					variant="light"
					size="sm"
					radius="full"
				>
					{formatNumber(1234)}
				</Button>
			</div>
		</div>
	);
};

export default memo(Post);
