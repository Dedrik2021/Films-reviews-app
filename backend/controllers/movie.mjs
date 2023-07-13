import { isValidObjectId } from 'mongoose';

import { sendError } from '../utils/helper.mjs';
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

	newMovie.poster = finalPoster;

	await newMovie.save();

	res.status(201).json({
		id: newMovie._id,
		title,
	});
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

	if (!file) return sendError(res, "Movie poster is missing!")

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

	const posterId = movie.poster?.public_id
	if (posterId) {
		const {result} = await cloudinary.uploader.destroy(posterId)
		if (result !== 'ok') {
			return sendError(res, "Could not update the poster at the moment!")
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

export { uploadTrailer, createMovie, updateMovieWithoutPoster, updateMovieWithPoster };
