import dotenv from 'dotenv';
import { isValidObjectId } from 'mongoose';

import Actor from '../models/actor.mjs';
import { sendError, uploadImageToCloud } from '../utils/helper.mjs';
import cloudinary from '../cloud/index.mjs';
import { formatActor } from '../utils/helper.mjs';

dotenv.config();

const createActor = async (req, res) => {
	const { name, about, gender } = req.body;

	const file = req.file;
	const newActor = new Actor({ name, about, gender });

	if (file) {
		const {url, public_id} = await uploadImageToCloud(file.path)
		newActor.avatar = {url, public_id}
	}
	await newActor.save();

	res.status(201).json(formatActor(newActor));
};

const updateActor = async (req, res) => {
	const { name, about, gender } = req.body;

	const { file } = req;
	const { actorId } = req.params;

	if (!isValidObjectId(actorId)) return sendError(res, 'Invalid request!');

	const actor = await Actor.findById(actorId);
	if (!actor) return sendError(res, 'Invalid request, record not found!');

	const public_id = actor.avatar?.public_id;

	if (public_id && file) {
		const { result } = await cloudinary.uploader.destroy(public_id);

		if (result !== 'ok') return sendError(res, 'Could not remove image from cloud!');
	}

	if (file) {
		// const {url, public_id} = await uploadImageToCloud(file.path)
		actor.avatar = await uploadImageToCloud(file.path);
	}

	actor.name = name;
	actor.about = about;
	actor.gender = gender;

	await actor.save();

	res.status(201).json(formatActor(actor));
};

const removeActor = async (req, res) => {
	const { actorId } = req.params;

	if (!isValidObjectId(actorId)) return sendError(res, 'Invalid request!');

	const actor = await Actor.findById(actorId);
	if (!actor) return sendError(res, 'Invalid request, record not found!');

	const public_id = actor.avatar?.public_id;

	if (public_id) {
		const { result } = await cloudinary.uploader.destroy(public_id);

		if (result !== 'ok') return sendError(res, 'Could not remove image from cloud!');
	}

	await Actor.findByIdAndDelete(actorId);

	res.status(201).json({ message: 'Actor has been removed seccessfully!' });
};

const searchActor = async (req, res) => {
	const { query } = req;
	const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

    const actors = result.map(actor => formatActor(actor))

	res.status(201).json(actors);
};

const getLatestActors = async (req, res) => {
	const result = await Actor.find().sort({ ceratedAt: '-1' }).limit(12);

    const actors = result.map(actor => formatActor(actor))

	res.status(201).json(actors);
};

const getSingleActor = async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) return sendError(res, 'Invalid request!');

	const actor = await Actor.findById(id);
	if (!actor) return sendError(res, 'Actor not found!', 404);

	res.status(201).json(formatActor(actor));
};

export { createActor, updateActor, removeActor, searchActor, getLatestActors, getSingleActor };