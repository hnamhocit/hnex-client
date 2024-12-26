import { Dispatch, FC, memo, SetStateAction } from "react";

import { Cancel01Icon } from "hugeicons-react";
import Upload from "../../Upload";
import UploadButton from "../../UploadButton";
import Video from "../../Video";

interface MediaUploadProps {
	files: File[];
	setFiles: Dispatch<SetStateAction<File[]>>;
}

const MediaUpload: FC<MediaUploadProps> = ({ files, setFiles }) => {
	return (
		<Upload
			value={files}
			onChange={setFiles}
			render={({ onClick, blobs, onDelete }) => (
				<div className="space-y-3">
					<div className="text-sm">Media</div>

					<div className="text-sm text-red-600 font-medium">
						{files.filter(
							(file) => file.type.split("/")[0] === "video"
						).length > 1 && "Maximum 1 video!"}
					</div>

					<UploadButton onClick={onClick} />

					<div className="grid grid-cols-2 gap-3">
						{files.map((file, i) => {
							const type = file.type.split("/")[0];
							if (type === "video") {
								return (
									<Video
										key={i}
										src={blobs[i]}
										className="col-span-2"
									/>
								);
							}

							return (
								<div
									key={i}
									className="relative rounded-2xl shadow-md min-h-44 bg-cover bg-center bg-no-repeat"
									style={{
										backgroundImage: `url(${blobs[i]})`,
									}}
								>
									<button
										type="button"
										onClick={() => onDelete(i)}
										className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-1 text-white rounded-full bg-red-600 shadow-md"
									>
										<Cancel01Icon />
									</button>
								</div>
							);
						})}
					</div>
				</div>
			)}
		/>
	);
};

export default memo(MediaUpload);
