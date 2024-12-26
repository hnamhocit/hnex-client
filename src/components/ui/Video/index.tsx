import { formatTime } from "@/utils/formatTime";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import {
	ArrowExpandIcon,
	ArrowShrinkIcon,
	FourKIcon,
	GoBackward15SecIcon,
	GoForward15SecIcon,
	PauseIcon,
	PlayIcon,
	Rocket01Icon,
	Settings02Icon,
	SubtitleIcon,
	VolumeHighIcon,
	VolumeLowIcon,
	VolumeOffIcon,
} from "hugeicons-react";
import { ChangeEvent, FC, memo, useRef, useState } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";
import ProgressBar from "./ProgressBar";

interface VideoProps {
	src: string;
	className?: string;
}

const VideoContainer = styled.div`
	.actions {
		opacity: 0;
		visibility: hidden;
	}

	&:hover .actions {
		opacity: 1;
		visibility: visible;
	}
`;

const Video: FC<VideoProps> = ({ src, className }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [volumn, setVolumn] = useState(1);

	const toggleIsPlaying = () => {
		setIsPlaying((prev) => {
			if (prev) {
				videoRef.current?.pause();
			} else {
				videoRef.current?.play();
			}

			return !prev;
		});
	};

	const toggleIsFullscreen = () => setIsFullscreen((prev) => !prev);

	const handleTimeUpdate = (e: ChangeEvent<HTMLVideoElement>) => {
		setCurrentTime(e.target.currentTime);
	};

	return (
		<VideoContainer
			className={clsx(
				"relative transition-all glassmorphism rounded-2xl",
				className,
				{
					"!fixed z-[9999] inset-0": isFullscreen,
				}
			)}
		>
			<video
				src={src}
				ref={videoRef}
				onTimeUpdate={handleTimeUpdate}
				onEnded={() => {
					if (videoRef.current) {
						videoRef.current.currentTime = 0;
						videoRef.current.play();
						toggleIsPlaying();
					}
				}}
				className={clsx(
					"w-full h-full block object-contain bg-center min-h-60",
					{
						"rounded-2xl": !isFullscreen,
					}
				)}
			/>

			<div className="absolute inset-0 actions transition-all">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-3">
					<Button
						isIconOnly
						radius="full"
						color="default"
						variant="bordered"
						className="bg-black border-none text-white"
					>
						<GoBackward15SecIcon />
					</Button>

					<Button
						isIconOnly
						radius="full"
						color="default"
						variant="bordered"
						onPress={toggleIsPlaying}
						className="bg-black border-none text-white"
					>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</Button>

					<Button
						isIconOnly
						radius="full"
						variant="bordered"
						color="default"
						className="bg-black border-none text-white"
					>
						<GoForward15SecIcon />
					</Button>
				</div>

				<div
					className={clsx(
						"absolute bottom-0 glassmorphism left-0 p-4 w-full space-y-1 text-white",
						{
							"rounded-b-2xl": !isFullscreen,
						}
					)}
				>
					<ProgressBar
						ref={videoRef}
						currentTime={currentTime}
						duration={videoRef.current?.duration}
					/>

					<div className="flex items-center justify-between">
						<div>
							{formatTime(currentTime)}/{" "}
							{formatTime(videoRef.current?.duration ?? 0)}
						</div>
						<div className="flex items-center gap-3">
							<Button
								isIconOnly
								size="sm"
								radius="full"
								variant="light"
								className="text-white"
							>
								{volumn === 0 ? (
									<VolumeOffIcon />
								) : volumn < 0.5 ? (
									<VolumeLowIcon />
								) : (
									<VolumeHighIcon />
								)}
							</Button>

							<Dropdown
								position="bottom-right"
								trigger={<Settings02Icon />}
								triggerClassName="block p-1 hover:bg-gray-400 rounded-full transition"
							>
								<DropdownItem>
									<FourKIcon />
									Quanlity
								</DropdownItem>

								<DropdownItem>
									<SubtitleIcon /> Substitute
								</DropdownItem>

								<DropdownItem>
									<Rocket01Icon />
									Playback speed
								</DropdownItem>
							</Dropdown>

							<Button
								isIconOnly
								size="sm"
								radius="full"
								variant="light"
								className="text-white"
								onPress={toggleIsFullscreen}
							>
								{isFullscreen ? (
									<ArrowShrinkIcon />
								) : (
									<ArrowExpandIcon />
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</VideoContainer>
	);
};

export default memo(Video);
