import { Slider } from "@nextui-org/react";
import { FC, memo, RefObject } from "react";

interface ProgressBarProps {
	currentTime: number;
	duration?: number;
	ref: RefObject<HTMLVideoElement | null>;
}

const ProgressBar: FC<ProgressBarProps> = ({
	currentTime,
	duration = 1,
	ref,
}) => {
	const handleChange = (value: number | number[]) => {
		if (typeof value === "number" && ref.current) {
			ref.current.currentTime = value * duration;
		}
	};

	return (
		<Slider
			minValue={0}
			maxValue={1}
			step={0.01}
			value={currentTime / duration}
			className="min-w-44"
			onChange={handleChange}
		/>
	);
};

export default memo(ProgressBar);
