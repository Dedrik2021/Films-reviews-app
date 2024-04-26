import client from './client';
import { getToken } from '../utils/helper';
import { catchError } from '../utils/helper';

const uploadTrailer = async (formData, onUploadProgress) => {
	const token = getToken();
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
		return catchError(error);
	}
};

const uploadMovie = async (formData) => {
	const token = getToken();
	try {
		const { data } = await client.post('/movie/create', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getMovieForUpdate = async (id) => {
	const token = getToken();
	try {
		const { data } = await client(`/movie/for-update/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const updateMovie = async (id, formData) => {
	const token = getToken();
	try {
		const { data } = await client.patch(`/movie/update/${id}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getMovies = async (pageNo, limit) => {
	const token = getToken();
	try {
		const { data } = await client(`/movie/movies?pageNo=${pageNo}&limit=${limit}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const deleteMovie = async (id) => {
	const token = getToken();
	try {
		const { data } = await client.delete(`/movie/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const searchMovieForAdmin = async (title) => {
	const token = getToken();
	try {
		const { data } = await client(`/movie/search?title=${title}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getTopRatedMovies = async (type, signal) => {
	
	try {
		let endpoint = '/movie/top-rated'
		if (type) endpoint = `${endpoint}?type=${type}`
		const { data } = await client(endpoint, {signal});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getLatestUploads = async (signal) => {
	
	try {
		const { data } = await client("/movie/latest-uploads", {signal});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getSingleMovie = async (id) => {
	
	try {
		const { data } = await client(`/movie/single/${id}`);
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getRelatedMovies = async (id) => {
	
	try {
		const { data } = await client(`/movie/related/${id}`);
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export {
	uploadTrailer,
	uploadMovie,
	getMovies,
	getMovieForUpdate,
	updateMovie,
	deleteMovie,
	searchMovieForAdmin,
	getTopRatedMovies,
	getLatestUploads,
	getSingleMovie,
	getRelatedMovies
};
