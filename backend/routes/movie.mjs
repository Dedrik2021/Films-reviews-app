import { Router } from 'express';

import { isAdmin, isAuth } from '../middlewares/auth.mjs';
import {
	uploadTrailer,
	createMovie,
	updateMovieWithoutPoster,
	updateMovie,
	removeMovie,
	getMovies,
	getMovieForUpdate,
	searchMovies
} from '../controllers/movie.mjs';
import { uploadImage, uploadVideo } from '../middlewares/multer.mjs';
import { validate, validateMovie, validateTrailer } from '../middlewares/validator.mjs';
import { parseData } from '../utils/helper.mjs';

const router = Router();

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post(
	'/create',
	isAuth,
	isAdmin,
	uploadImage.single('poster'),
	parseData,
	validateMovie,
	validateTrailer,
	validate,
	createMovie,
);
// router.patch(
// 	'/update-movie-without-poster/:movieId',
// 	isAuth,
// 	isAdmin,
// 	// parseData,
// 	validateMovie,
// 	validate,
// 	updateMovieWithoutPoster,
// );
router.patch(
	'/update/:movieId',
	isAuth,
	isAdmin,
	uploadImage.single('poster'),
	parseData,
	validateMovie,
	validateTrailer,
	validate,
	updateMovie,
);
router.delete('/:movieId', isAuth, isAdmin, removeMovie);
router.get('/movies', isAuth, isAdmin, getMovies);
router.get('/for-update/:movieId', isAuth, isAdmin, getMovieForUpdate);
router.get('/search', isAuth, isAdmin, searchMovies);

export default router;
