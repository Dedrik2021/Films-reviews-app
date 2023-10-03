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

const uploadMovie = async (formData) => {
	const token = getToken()
	try {
		const { data } = await client.post('/movie/create', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}
		});
		return data;
	} catch (error) {
		return catchError(error)
	}
};

const getMovies = async (pageNo, limit) => {
	const token = getToken()
	try {
		const { data } = await client(`/movie/movies?pageNo=${pageNo}&limit=${limit}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}
		});
		return data;
	} catch (error) {
		return catchError(error)
	}
};

export { uploadTrailer, uploadMovie, getMovies };
