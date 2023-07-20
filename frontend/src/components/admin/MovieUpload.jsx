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
		<TrailerSelector
			onTypeError={handleTypeError}
			handleChange={handleChange}
			visible={!videoSelected}
		/>
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
