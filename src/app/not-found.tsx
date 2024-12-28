"use client";

import { Button } from "@nextui-org/react";
import { Alert02Icon, ArrowLeft01Icon, Sad02Icon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-4 items-center h-full justify-center">
			{/* <Image src="/not-found.avif" alt="Page Not Found" width={300} /> */}
			<Sad02Icon size={100} />

			<div className="text-2xl font-bold">Page not found</div>

			<div>This page may have been deleted or no longer exists</div>

			<div className="flex items-center gap-4">
				<Link href="/">
					<Button
						startContent={<Alert02Icon />}
						radius="full"
						color="danger"
					>
						Report
					</Button>
				</Link>

				<Button
					startContent={<ArrowLeft01Icon />}
					onPress={() => router.back()}
					radius="full"
					color="primary"
				>
					Go back
				</Button>
			</div>
		</div>
	);
};

export default PageNotFound;
