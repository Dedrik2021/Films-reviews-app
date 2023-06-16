import mongoose from 'mongoose';

mongoose
	.connect('mongodb://localhost:27017/review-app-new-project')
	.then(() => {
		console.log('Db is connected!');
	})
	.catch((error) => {
		console.log('Db connection filed', error);
	});
