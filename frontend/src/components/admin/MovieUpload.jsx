import { FileUploader } from 'react-drag-drop-files';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';

import { useNotification } from '../../hooks';
import { uploadTrailer } from '../../api/movie';

const MovieUpload = () => {
	const { updateNotification } = useNotification();
	const [videoSelected, setVideoSelected] = useState(true);

	const handleChange = async (file) => {
		const formData = new FormData();
		formData.append('video', file);

		const res = await uploadTrailer(formData);
		console.log(res);
	};

	const handleTypeError = (error) => {
		updateNotification('error', error);
	};

	return (
		<div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
			<div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto ">
				<div className="p-2">
					<div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
						<div className="h-3 dark:bg-dark-subtle bg-light-subtle relative overflow-hidden">
							<div
								style={{ width: '80%' }}
								className={`h-full absolute left-0 dark:bg-white bg-secondary`}
							></div>
						</div>
						<p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-2">
							Upload progress 80%
						</p>
					</div>
				</div>
				<TrailerSelector
					onTypeError={handleTypeError}
					handleChange={handleChange}
					visible={!videoSelected}
				/>
			</div>
		</div>
	);
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
	if (!visible) return null;

	return (
		<div className="flex items-center justify-center h-full">
			<FileUploader
				handleChange={handleChange}
				name="file"
				onTypeError={onTypeError}
				types={['mp4', 'avi']}
			>
				<div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center cursor-pointer dark:text-dark-subtle text-secondary">
					<AiOutlineCloudUpload size={80} />
					<p>Drop your file here!</p>
				</div>
			</FileUploader>
		</div>
	);
};

export default MovieUpload;
