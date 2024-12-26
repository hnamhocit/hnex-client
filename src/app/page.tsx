"use client";

import { useContext, useEffect, useState } from "react";

import CreatePostModal from "@/components/ui/CreatePostModal";
import SkeletonPost from "@/components/ui/Loadings/SkeletonPost";
import Post from "@/components/ui/Post";
import api from "@/config/axios";
import { ToastContext } from "@/context/ToastContext";
import { Post as IPost } from "@/types/post";

export default function Home() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [loading, setLoading] = useState(true);
	const { newToast } = useContext(ToastContext);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const { data } = await api.get("posts");

			if ("error" in data) {
				newToast({ type: "error", message: data.error });
				return;
			}

			setLoading(false);
			setPosts(data.data);
		};

		fetchPosts();
	}, [newToast]);

	const handleDelete = async (id: string) => {
		const { data } = await api.delete(`posts/${id}`);

		if ("error" in data) {
			newToast({ type: "error", message: data.error });
			return;
		}

		setPosts((prev) => prev.filter((post) => post.id !== id));
		newToast({ message: "Post deleted successfully 🚀" });
	};

	return (
		<div className="space-y-7">
			<CreatePostModal />

			<div className="space-y-5">
				{loading ? (
					<>
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
						<SkeletonPost />
					</>
				) : (
					posts.map((post) => (
						<Post
							key={post.id}
							post={post}
							onDelete={handleDelete}
						/>
					))
				)}
			</div>
		</div>
	);
}
