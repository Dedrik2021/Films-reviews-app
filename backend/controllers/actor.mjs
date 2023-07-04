import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import {isValidObjectId} from 'mongoose'

import Actor from '../models/actor.mjs';
import { sendError } from '../utils/helper.mjs';

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
		const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            gravity: "face", height: 500, width: 500, crop: "thumb"
        });
		newActor.avatar = { url: secure_url, public_id };
	}
	await newActor.save();

	res.status(201).json({ id: newActor._id, name, about, gender, avatar: newActor.avatar?.url });
};

const updateActor = async (req, res) => {
    const {name, about, gender} = req.body

    const {file} = req
    const {actorId} = req.params

    if (!isValidObjectId(actorId)) return sendError(res, "Invalid request!")

    const actor = await Actor.findById(actorId)
    if (!actor) return sendError(res, "Invalid request, record not found!")

    const public_id = actor.avatar?.public_id

    if (public_id && file) {
        const {result} = await cloudinary.uploader.destroy(public_id)

        if (result !== 'ok') return sendError(res, "Could not remove image from cloud!")
    }

    if (file) {
		const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            gravity: "face", height: 500, width: 500, crop: "thumb"
        });
		actor.avatar = { url: secure_url, public_id };
	}

    actor.name = name
    actor.about = about
    actor.gender = gender

    await actor.save()

    res.status(201).json({ id: actor._id, name, about, gender, avatar: actor.avatar?.url });
}

export { createActor, updateActor };
