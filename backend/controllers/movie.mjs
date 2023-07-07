import dotenv from 'dotenv';
import { isValidObjectId } from 'mongoose';

import { sendError } from '../utils/helper.mjs';
import cloudinary from '../cloud/index.mjs';
import Movie from '../models/movie.mjs';

dotenv.config();

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
		releaseDate,
		status,
		type,
		genres,
		tags,
		cast,
		writers,
		poster,
		trailer,
		language,
	} = body;

	console.log(typeof req.body.trailerInfo);
	console.log(typeof req.body.cast);
	console.log(typeof req.body.tags);
	console.log(typeof req.body.writers);
	console.log(typeof req.body.genres);
    res.send('ok')
};

export { uploadTrailer, createMovie };
