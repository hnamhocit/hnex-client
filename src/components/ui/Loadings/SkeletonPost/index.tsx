import { Skeleton } from "@nextui-org/react";

const SkeletonPost = () => {
	return (
		<div className="space-y-3 p-4 bg-white rounded-2xl">
			<div className="flex items-center gap-3">
				<Skeleton className="w-12 h-12 rounded-full" />
				<div className="space-y-1">
					<Skeleton className="w-32 h-4 rounded-md" />
					<Skeleton className="w-16 h-4 rounded-md" />
				</div>
			</div>

			<Skeleton className="w-full min-h-24 rounded-2xl" />

			<div className="grid grid-cols-2 gap-3">
				<Skeleton className="min-h-44 rounded-2xl" />
				<Skeleton className="min-h-44 rounded-2xl" />
				<Skeleton className="min-h-44 rounded-2xl" />
				<Skeleton className="min-h-44 rounded-2xl" />
			</div>

			<div className="flex items-center justify-end gap-3">
				<Skeleton className="min-w-24 h-8 rounded-full" />
				<Skeleton className="min-w-24 h-8 rounded-full" />
				<Skeleton className="min-w-24 h-8 rounded-full" />
				<Skeleton className="min-w-24 h-8 rounded-full" />
			</div>
		</div>
	);
};

export default SkeletonPost;