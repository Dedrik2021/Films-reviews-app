import { Router } from 'express';

import { isAdmin, isAuth } from '../middlewares/auth.mjs';
import { uploadTrailer, createMovie } from '../controllers/movie.mjs';
import { uploadImage, uploadVideo } from '../middlewares/multer.mjs';
import { validate, validateMovie } from '../middlewares/validator.mjs';
import { parseData } from '../utils/helper.mjs';

const router = Router();

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post(
	'/create',
	isAuth,
	isAdmin,
	uploadImage.single('poster'),
	parseData,
	// validateMovie,
    // validate,
	createMovie,
);

export default router;
