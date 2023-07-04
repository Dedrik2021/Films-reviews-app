import mongoose from 'mongoose';

const actorShema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			require: true,
		},
		about: {
			type: String,
			trim: true,
			require: true,
		},
		gender: {
			type: String,
			require: true,
			trim: true,
		},
		avatar: {
			type: Object,
			url: String,
			public_id: String,
		},
	},
	{ timestamps: true },
);

actorShema.index({name: "text"})

export default mongoose.model('Actor', actorShema);
