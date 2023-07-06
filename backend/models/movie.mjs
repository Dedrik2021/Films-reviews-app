import mongoose from 'mongoose';

import { genres } from '../utils/genres.mjs';

const movieShema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			require: true,
		},
		storyLine: {
			type: String,
			trim: true,
			require: true,
		},
		director: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Actor',
		},
		releaseDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['public', 'private'],
		},
		type: {
			type: String,
			required: true,
		},
		genres: {
			type: [String],
			required: true,
			enum: genres,
		},
		tags: {
			type: [String],
			required: true,
		},
		cast: [
			{
				actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' },
				roleAs: String,
				loadActor: Boolean,
			},
		],
		writers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Actor',
			},
		],
		poster: {
			type: Object,
			url: { type: String, required: true },
			public_id: { type: String, required: true },
			required: true,
		},
		trailer: {
			type: Object,
			url: { type: String, required: true },
			public_id: { type: String, required: true },
			required: true,
		},
		reviews: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Review',
			},
		],
		languege: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Movie', movieShema);
