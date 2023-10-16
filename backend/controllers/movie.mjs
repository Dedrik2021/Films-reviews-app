import { isValidObjectId } from 'mongoose';

import { formatActor, sendError } from '../utils/helper.mjs';
import cloudinary from '../cloud/index.mjs';
import Movie from '../models/movie.mjs';

const uploadTrailer = async (req, res) => {
	const { file } = req;

	if (!file) return sendError(res, 'Video file is missing!');

	const { secure_url: url, public_id } = await cloudinary.uploader.upload(file.path, {
		resource_type: 'video',
	});
	res.status(201).json({ url, public_id });
};

const createMovie = async (req, res) => {
	const { file, body } = req;

	const {
		title,
		storyLine,
		director,
		releseDate,
		status,
		type,
		genres,
		tags,
		cast,
		writers,
		trailer,
		language,
	} = body;

	const newMovie = new Movie({
		title,
		storyLine,
		releseDate,
		status,
		type,
		genres,
		tags,
		cast,
		trailer,
		language,
	});

	if (director) {
		if (!isValidObjectId(director)) return sendError(res, 'Invalid director id!');
		newMovie.director = director;
	}

	if (writers) {
		for (const writerId of writers) {
			if (!isValidObjectId(writerId)) return sendError(res, 'Invalid writer id!');
		}
		newMovie.writers = writers;
	}

	if (fiel) {
		const {
			secure_url: url,
			public_id,
			responsive_breakpoints,
		} = await cloudinary.uploader.upload(file.path, {
			transformation: {
				width: 1280,
				height: 1280,
			},
			responsive_breakpoints: {
				create_derived: true,
				max_width: 640,
				max_images: 3,
			},
		});

		const finalPoster = { url, public_id, responsive: [] };
		const { breakpoints } = responsive_breakpoints[0];

		if (breakpoints.length) {
			for (const imgObj of breakpoints) {
				const { secure_url } = imgObj;
				finalPoster.responsive.push(secure_url);
			}
			newMovie.poster = finalPoster;
		}

		await newMovie.save();

		res.status(201).json({
			id: newMovie._id,
			title,
		});
	}
};

const updateMovieWithoutPoster = async (req, res) => {
	const { movieId } = req.params;
	const { body } = req;

	if (!isValidObjectId(movieId)) return sendError(res, 'Invalid movie ID!');

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, 'Movie not found!', 404);

	const {
		title,
		storyLine,
		director,
		releseDate,
		status,
		type,
		genres,
		tags,
		cast,
		writers,
		trailer,
		language,
	} = body;

	movie.title = title;
	movie.storyLine = storyLine;
	movie.releseDate = releseDate;
	movie.status = status;
	movie.type = type;
	movie.genres = genres;
	movie.tags = tags;
	movie.cast = cast;
	movie.trailer = trailer;
	movie.language = language;

	if (director) {
		if (!isValidObjectId(director)) return sendError(res, 'Invalid director id!');
		movie.director = director;
	}

	if (writers) {
		for (const writerId of writers) {
			if (!isValidObjectId(writerId)) return sendError(res, 'Invalid writer id!');
		}
		movie.writers = writers;
	}

	await movie.save();

	res.status(201).json({ message: 'Movie is updated', movie });
};

const updateMovieWithPoster = async (req, res) => {
	const { movieId } = req.params;
	const { body, file } = req;

	if (!isValidObjectId(movieId)) return sendError(res, 'Invalid movie ID!');

	if (!file) return sendError(res, 'Movie poster is missing!');

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, 'Movie not found!', 404);

	const {
		title,
		storyLine,
		director,
		releseDate,
		status,
		type,
		genres,
		tags,
		cast,
		writers,
		trailer,
		language,
	} = body;

	movie.title = title;
	movie.storyLine = storyLine;
	movie.releseDate = releseDate;
	movie.status = status;
	movie.type = type;
	movie.genres = genres;
	movie.tags = tags;
	movie.cast = cast;
	movie.trailer = trailer;
	movie.language = language;

	if (director) {
		if (!isValidObjectId(director)) return sendError(res, 'Invalid director id!');
		movie.director = director;
	}

	if (writers) {
		for (const writerId of writers) {
			if (!isValidObjectId(writerId)) return sendError(res, 'Invalid writer id!');
		}
		movie.writers = writers;
	}

	const posterId = movie.poster?.public_id;
	if (posterId) {
		const { result } = await cloudinary.uploader.destroy(posterId);
		if (result !== 'ok') {
			return sendError(res, 'Could not update the poster at the moment!');
		}
	}

	const {
		secure_url: url,
		public_id,
		responsive_breakpoints,
	} = await cloudinary.uploader.upload(file.path, {
		transformation: {
			width: 1280,
			height: 1280,
		},
		responsive_breakpoints: {
			create_derived: true,
			max_width: 640,
			max_images: 3,
		},
	});

	const finalPoster = { url, public_id, responsive: [] };
	const { breakpoints } = responsive_breakpoints[0];

	if (breakpoints.length) {
		for (const imgObj of breakpoints) {
			const { secure_url } = imgObj;
			finalPoster.responsive.push(secure_url);
		}
	}

	movie.poster = finalPoster;

	await movie.save();

	res.status(201).json({ message: 'Movie is updated', movie });
};

const removeMovie = async (req, res) => {
	const { movieId } = req.params;

	if (!isValidObjectId(movieId)) return sendError(res, 'Invalid movie ID!');

	const movie = await Movie.findById(movieId);
	if (!movie) return sendError(res, 'Movie not found!', 404);

	const publicId = movie.poster?.public_id;
	if (publicId) {
		const { result } = await cloudinary.uploader.destroy(publicId);
		if (result !== 'ok') return sendError(res, 'Could not remove poster from cloud!');
	}

	const trailerId = movie.trailer?.public_id;
	if (!trailerId) return sendError(res, 'Could not find trailer in the cloud!');

	const { result } = await cloudinary.uploader.destroy(trailerId, {
		resource_type: 'video',
	});
	if (result !== 'ok') return sendError(res, 'Could not remove trailer from cloud!');

	await Movie.findByIdAndDelete(movieId);

	res.status(201).json({ message: 'Movie removed successfully!' });
};

const getMovies = async (req, res) => {
	const { pageNo = 0, limit = 10 } = req.query;

	const movies = await Movie.find({})
		.sort({ createdAt: -1 })
		.skip(parseInt(pageNo) * parseInt(limit))
		.limit(parseInt(limit));

	const results = movies.map((movie) => ({
		id: movie._id,
		title: movie.title,
		poster: movie.poster?.url,
		genres: movie.genres,
		status: movie.status,
	}));

	res.status(201).json({movies: results})
};

const getMovieForUpdate = async (req, res) => {
	const {movieId} = req.params

	if (!isValidObjectId(movieId)) return sendError(res, "Id is invalid!")
	const movie = await Movie.findById(movieId).populate('director writers cast.actor')

	res.status(201).json({movie : {
		id: movie._id,
		title: movie.title,
		storyLine: movie.storyLine,
		poster: movie.poster?.url,
		releseDate: movie.releseDate,
		status: movie.status,
		type: movie.type,
		language: movie.language,
		genres: movie.genres,
		tags: movie.tags,
		director: formatActor(movie.director),
		writers: movie.writers.map(w => formatActor(w)),
		cast: movie.cast.map(c => {
			return {
				id: c.id,
				profile: formatActor(c.actor),
				roleAs: c.roleAs,
				leadActor: c.leadActor
			}
		})
	}})
}

export {
	uploadTrailer,
	createMovie,
	updateMovieWithoutPoster,
	updateMovieWithPoster,
	removeMovie,
	getMovies,
	getMovieForUpdate
};
