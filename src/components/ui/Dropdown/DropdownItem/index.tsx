import clsx from "clsx";
import { HTMLMotionProps, motion } from "motion/react";
import { FC, memo } from "react";

const DropdownItem: FC<Omit<HTMLMotionProps<"button">, "ref">> = (props) => {
	return (
		<motion.button
			{...props}
			whileTap={{ scale: 0.8 }}
			whileHover={{ scale: 1.05 }}
			className={clsx(
				"flex items-center gap-3 p-2 text-black hover:bg-indigo-500 hover:text-white transition rounded-2xl w-full",
				props.className
			)}
		>
			{props.children}
		</motion.button>
	);
};

export default memo(DropdownItem);
