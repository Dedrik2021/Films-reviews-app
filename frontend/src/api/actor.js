import client from './client';
import { getToken } from '../utils/helper';
import { catchError } from '../utils/helper';

const createActor = async (formData) => {
	const token = getToken();
	try {
		const { data } = await client.post('/actor/create', formData, {
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

const updateActor = async (id, formData) => {
	const token = getToken();
	try {
		const { data } = await client.post(`/actor/update/${id}`, formData, {
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

const deleteActor = async (id) => {
	const token = getToken();
	try {
		const { data } = await client.delete(`/actor/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const searchActor = async (query) => {
	const token = getToken();
	try {
		const { data } = await client(`/actor/search?name=${query}`, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getActors = async (pageNo, limit) => {
	const token = getToken();
	try {
		const { data } = await client(`/actor/actors?pageNo=${pageNo}&limit=${limit}`, {
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


export { createActor, searchActor, getActors, updateActor, deleteActor };
