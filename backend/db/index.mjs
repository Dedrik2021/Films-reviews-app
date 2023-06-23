import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('Db is connected!');
	})
	.catch((error) => {
		console.log('Db connection filed', error);
	});
