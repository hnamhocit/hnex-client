"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import FormGroup from "@/components/ui/FormGroup";
import Upload from "@/components/ui/Upload";
import api from "@/config/axios";
import { useAppDispatch } from "@/store";
import { selectUser } from "@/store/reducers/userSlice";
import { updateUser } from "@/store/reducers/userSlice/thunks";
import { User } from "@/types/user";
import { getMediaURL } from "@/utils/getUploadURL";
import { validate } from "@/utils/validate";

type FormData = {
	username?: string;
	displayName: string;
	email: string;
	password: string;
	photoURL?: string;
	backgroundURL?: string;
};

const Settings = () => {
	const user = useSelector(selectUser);
	const dispatch = useAppDispatch();
	const [disabled, setDisabled] = useState(false);
	const [avatars, setAvatars] = useState<File[]>([]);
	const [backgrounds, setBackgrounds] = useState<File[]>([]);
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<User>({
		defaultValues: {
			displayName: user.data?.displayName,
			email: user.data?.email,
			password: user.data?.password,
			username: user.data?.username || "",
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		setDisabled(true);
		dispatch(updateUser(formData));
		setDisabled(false);
	};

	const handleUploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		console.log({ file });

		const { data } = await api.post("media/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		console.log({ data });

		const url = getMediaURL(data.data.id);
		return url;
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="overflow-hidden space-y-7"
		>
			<div className="space-y-3">
				<div className="text-gray-500">Avatar</div>

				<Upload
					single
					value={avatars}
					onChange={async (files) => {
						setAvatars(files);
						const url = await handleUploadFile(files[0]);
						dispatch(updateUser({ photoURL: url }));
					}}
					render={({ onClick, blobs }) => (
						<div
							style={{
								backgroundImage: `url(${
									blobs[0] ||
									user.data?.photoURL ||
									"empty-image.jpg"
								})`,
							}}
							className="w-20 h-20 border-2 rounded-full bg-cover bg-center bg-no-repeat"
							onClick={onClick}
						></div>
					)}
				/>
			</div>

			<div className="space-y-3">
				<div className="text-gray-500">Background</div>

				<Upload
					single
					value={backgrounds}
					onChange={async (files) => {
						setBackgrounds(files);
						const url = await handleUploadFile(files[0]);
						dispatch(updateUser({ backgroundURL: url }));
					}}
					render={({ blobs, onClick }) => (
						<div
							style={{
								backgroundImage: `url(${
									blobs[0] ??
									user.data?.backgroundURL ??
									"empty-image.jpg"
								})`,
							}}
							onClick={onClick}
							className="min-w-80 min-h-60 rounded-2xl border-2 bg-cover bg-center bg-no-repeat"
						></div>
					)}
				/>
			</div>

			<Controller
				name="displayName"
				control={control}
				rules={{
					required: validate.required,
					minLength: 3,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label="Display name"
						value={value}
						onChange={onChange}
						className="max-w-80"
						errorMessage={errors.displayName?.message}
					/>
				)}
			/>

			<Controller
				name="username"
				control={control}
				rules={{
					required: validate.required,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label="Username"
						value={value ?? ""}
						onChange={onChange}
						className="max-w-80"
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				rules={{
					required: validate.required,
					pattern: validate.email,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label="Email"
						value={value}
						onChange={onChange}
						className="max-w-80"
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				rules={{
					required: validate.required,
					pattern: validate.password,
				}}
				render={({ field: { value, onChange } }) => (
					<FormGroup
						label="Password"
						value={value}
						onChange={onChange}
						className="max-w-80"
					/>
				)}
			/>

			<Button
				disabled={disabled}
				color="primary"
				type="submit"
				radius="full"
			>
				Submit
			</Button>
		</form>
	);
};

export default Settings;
