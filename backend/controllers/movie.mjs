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

    const newMovie = new Movie({
        title,
		storyLine,
		releaseDate,
		status,
		type,
		genres,
		tags,
		cast,
		trailer,
		language,
    })

    if (director) {
        if (!isValidObjectId(director)) return sendError(res, "Invalid director id!")
        newMovie.director = director
    }

    if (writers) {
        for (const writerId of writers) {
            if (!isValidObjectId(writerId)) return sendError(res, "Invalid writer id!")
        }
        newMovie.writers = writers
    }
};

export { uploadTrailer, createMovie };
