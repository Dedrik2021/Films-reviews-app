import client from "./client";
import { getToken } from "../utils/helper";
import { catchError } from "../utils/helper";

const createActor = async (formData) => {
    const token = getToken()
	try {
		const { data } = await client.post('/actor/create', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}
		});
		return data;
	} catch (error) {
		return catchError(error)
	}
}

export {createActor}