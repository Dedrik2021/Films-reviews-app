import { getToken, catchError } from "../utils/helper";
import client from "./client";

const addReview = async (movieId, reviewData) => {
	const token = getToken();
	try {
		const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const getReviewByMovie = async (movieId) => {
	try {
		const { data } = await client(`/review/get-review-by-movie/${movieId}`);
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const deleteReview = async (reviewId) => {
	const token = getToken();
	try {
		const { data } = await client.delete(`/review/${reviewId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

const updateReview = async (reviewId, reviewData) => {
	const token = getToken();
	try {
		const { data } = await client.patch(`/review/${reviewId}`, reviewData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export {
    addReview,
	getReviewByMovie,
	deleteReview,
	updateReview
}