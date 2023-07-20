import client from './client';

const uploadTrailer = async (formData, onUploadProgress) => {
	const token = localStorage.getItem('auth-token');
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
		const { response } = error;
		if (response?.data) return response.data;

		return { error: error.message || error };
	}
};

export { uploadTrailer };
