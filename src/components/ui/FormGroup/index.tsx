import clsx from "clsx";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";
import { motion } from "motion/react";
import {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	ReactElement,
	useId,
	useState,
} from "react";

interface FormGroupProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	startIcon?: ReactElement;
	isPassword?: boolean;
	errorMessage?: string;
	label: string;
	onChange: (value: string) => void;
}

const FormGroup: FC<FormGroupProps> = ({
	startIcon,
	isPassword,
	errorMessage,
	className,
	label,
	onChange,
	...props
}) => {
	const [visible, setVisible] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const id = useId();

	const toggleVisible = () => setVisible((prev) => !prev);
	const toggleIsFocus = () => setIsFocus((prev) => !prev);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.trim().startsWith(" ")) return;
		onChange(value);
	};

	return (
		<div className="space-y-1">
			<label
				htmlFor={id}
				className={clsx(
					"text-sm font-medium text-gray-500 transition",
					{
						"!text-indigo-500": isFocus,
					}
				)}
			>
				{label}
			</label>

			<motion.div
				className={clsx(
					"flex items-center gap-3 px-3 transition-all border-2 rounded-full border-gray-700",
					{
						"border-indigo-500": isFocus,
					},
					className
				)}
			>
				{startIcon}

				<input
					{...props}
					id={id}
					type={isPassword ? (visible ? "text" : "password") : "text"}
					className="block py-2 px-3 bg-transparent w-full outline-none transition focus:border-pink-500 rounded-r-full"
					onFocus={toggleIsFocus}
					onBlur={toggleIsFocus}
					onChange={handleChange}
				/>

				{isPassword && (
					<motion.button
						whileTap={{ scale: 0.95 }}
						type="button"
						onClick={toggleVisible}
					>
						{visible ? <ViewIcon /> : <ViewOffIcon />}
					</motion.button>
				)}
			</motion.div>

			<div className="text-xs text-red-600 font-medium">
				{errorMessage}
			</div>
		</div>
	);
};

export default FormGroup;
