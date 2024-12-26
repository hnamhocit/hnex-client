import {
	Chatting01Icon,
	Home01Icon,
	Notification03Icon,
	ShoppingBag02Icon,
	ShoppingCart02Icon,
} from "hugeicons-react";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import UserMenu from "./UserMenu";

const pages = [
	{
		href: "/",
		content: "Home",
		icon: <Home01Icon />,
	},
	{
		href: "/notifications",
		content: "Notifications",
		icon: <Notification03Icon />,
	},
	{
		href: "/chat",
		content: "Chat",
		icon: <Chatting01Icon />,
	},
	{
		href: "/shopping",
		content: "Shopping",
		icon: <ShoppingBag02Icon />,
	},
	{
		href: "/me/cart",
		content: "Cart",
		icon: <ShoppingCart02Icon />,
	},
];

export type Pages = typeof pages;
export type Page = Pages[0];

const Sidebar = () => {
	return (
		<div className="p-4 shrink-0 bg-[rgba(55,65,81,.5)] backdrop-blur-md w-60 flex flex-col gap-7">
			<div className="flex items-center gap-3 shrink-0">
				<Image
					src="/logo.jpg"
					width={56}
					height={56}
					alt="App Logo"
					className="rounded-full shrink-0 border-2 border-primary w-14 h-14 object-cover"
				/>

				<div>
					<div className="font-bold">HNEX</div>
					<div className="text-xs">Fast, reliable, covenient</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-between">
				<div className="space-y-3">
					{pages.map((page) => (
						<ActiveLink key={page.href} {...page} />
					))}
				</div>

				<UserMenu />
			</div>
		</div>
	);
};

export default Sidebar;
