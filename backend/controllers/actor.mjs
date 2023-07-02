import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import Actor from '../models/actor.mjs';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
	secure: true,
});

const createActor = async (req, res) => {
	const { name, about, gender } = req.body;

	const file = req.file;
	const newActor = new Actor({ name, about, gender });

	if (file) {
		const { secure_url, public_id } = await cloudinary.uploader.upload(file.path);
		newActor.avatar = { url: secure_url, public_id };
	}
	await newActor.save();

	res.status(201).json({ id: newActor._id, name, about, gender, avatar: newActor.avatar?.url });
};

export { createActor };
