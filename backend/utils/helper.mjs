import crypto from 'crypto';

import cloudinary from '../cloud/index.mjs';

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

export { sendError, generateRandomByte, handleNotFound, uploadImageToCloud, formatActor };
