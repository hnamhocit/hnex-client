import {
	ChangeEvent,
	FC,
	memo,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from "react";

interface Props {
	blobs: string[];
	onClick: () => void;
	onDelete: (index: number) => void;
	reset: () => void;
}

interface UploadProps {
	value: File[];
	onChange: (files: File[]) => void | Promise<void>;
	render: (props: Props) => ReactElement;
	single?: boolean;
}

const Upload: FC<UploadProps> = ({ render, onChange, single, value }) => {
	const [blobs, setBlobs] = useState<string[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		return () => {
			blobs.forEach((blob) => URL.revokeObjectURL(blob));
		};
	}, [blobs]);

	const onClick = () => inputRef.current?.click();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const _files = Array.from(files);
			const blobs = _files.map((file) => URL.createObjectURL(file));

			onChange(single ? _files : [...value, ..._files]);

			setBlobs((prev) => {
				if (single) return blobs;
				return [...prev, ...blobs];
			});
		}
	};

	const onDelete = (index: number) => {
		onChange(value.filter((_, i) => i !== index));
		setBlobs((prev) => prev.filter((_, i) => i !== index));
	};

	const reset = () => {
		onChange([]);
		setBlobs([]);
	};

	const child = render({ blobs, onClick, onDelete, reset });

	return (
		<div>
			<input
				onChange={handleChange}
				ref={inputRef}
				type="file"
				multiple={!single}
				hidden
			/>

			{child}
		</div>
	);
};

export default memo(Upload);
