import client from './client';
import { getToken } from '../utils/helper';
import { catchError } from '../utils/helper';

const uploadTrailer = async (formData, onUploadProgress) => {
	const token = getToken()
	try {
		const { data } = await client.post('/movie/upload-trailer', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: ({ loaded, total }) => {
				if (onUploadProgress) onUploadProgress(Math.floor(loaded / total) * 100);
			},
		});
		return data;
	} catch (error) {
		return catchError(error)
	}
};

export { uploadTrailer };
