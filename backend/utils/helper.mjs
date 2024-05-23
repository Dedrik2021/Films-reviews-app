import crypto from 'crypto';

import cloudinary from '../cloud/index.mjs';
import Review from '../models/review.mjs';

const sendError = (res, error, statusCode = 401) => {
	res.status(statusCode).json({ error });
};

const generateRandomByte = () => {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(30, (err, buff) => {
			if (err) reject(err);
			const buffString = buff.toString('hex');
			resolve(buffString);
		});
	});
};

const uploadImageToCloud = async (file) => {
	const { secure_url: url, public_id } = await cloudinary.uploader.upload(file, {
		gravity: 'face',
		height: 500,
		width: 500,
		crop: 'thumb',
	});

	return { url, public_id };
};

const formatActor = (actor) => {
	const { _id, name, about, gender, avatar } = actor;
	return { id: _id, name, about, gender, avatar: avatar?.url };
};

const handleNotFound = (req, res) => {
	sendError(res, 'Not Found', 404);
};

const parseData = (req, res, next) => {
	const { trailer, cast, genres, tags, writers } = req.body;

	if (trailer) req.body.trailer = JSON.parse(trailer);
	if (cast) req.body.cast = JSON.parse(cast);
	if (genres) req.body.genres = JSON.parse(genres);
	if (tags) req.body.tags = JSON.parse(tags);
	if (writers) req.body.writers = JSON.parse(writers);

	next();
};

const averageRatingPipeline = (movieId) => {
	return [
		{
			$lookup: {
				from: 'Review',
				localField: 'rating',
				foreignField: '_id',
				as: 'avgRat',
			},
		},
		{
			$match: {
				parentMovieId: movieId,
			},
		},
		{
			$group: {
				_id: null,
				ratingAvg: {
					$avg: '$rating',
				},
				reviewCount: {
					$sum: 1,
				},
			},
		},
	];
};

const relatedMovieAggregation = (tags, movieId) => {
	return [
		{
			$lookup: {
				from: 'Movie',
				localField: 'tags',
				foreignField: '_id',
				as: 'relatedMovies',
			},
		},
		{
			$match: {
				tags: { $in: [...tags] },
				_id: { $ne: movieId },
			},
		},
		{
			$project: {
				title: 1,
				poster: '$poster.url',
				responsivePosters: "$poster.responsive",
			},
		},
		{ $limit: 5 },
	];
};

const getAverageRatings = async (movieId) => {
	let reviews = {},
		aggregatedResponse;

	try {
		[aggregatedResponse] = await Review.aggregate(this.averageRatingPipeline(movieId));
	} catch (err) {
		return next(sendError(res, 'Something went wrong, averageRatingPipeline not work!'));
	}

	if (aggregatedResponse) {
		const { ratingAvg, reviewCount } = aggregatedResponse;
		reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
		reviews.reviewCount = reviewCount;
	}

	return reviews;
};

const topRatedMoviesPipeline = async (type) => {
	const matchOptions = {
		reviews: {$exists: true},
		status: {$eq: "public"}
	}

	if (type) matchOptions.type = {$eq: type}

	return [
		{
			$lookup: {
				from: 'Movie',
				localField: 'reviews',
				foreignField: '_id',
				as: 'toRated',
			},
		},
		{
			$match: matchOptions,
		},
		{
			$project: {
				title: 1,
				poster: '$poster.url',
				responsivePosters: '$poster.responsive',
				reviewCount: { $size: '$reviews' },
			},
		},
		{
			$sort: {
				reviewCount: -1,
			},
		},
		{
			$limit: 5,
		},
	]
}

export {
	sendError,
	generateRandomByte,
	handleNotFound,
	uploadImageToCloud,
	formatActor,
	parseData,
	averageRatingPipeline,
	relatedMovieAggregation,
	getAverageRatings,
	topRatedMoviesPipeline
};
