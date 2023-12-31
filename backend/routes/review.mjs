import { Router } from 'express';

import { addReview, updateReview, removeReview, getReviewsByMovie } from '../controllers/review.mjs';
import { uploadImage } from '../middlewares/multer.mjs';
import { validateRatings, validate } from '../middlewares/validator.mjs';
import { isAdmin, isAuth } from '../middlewares/auth.mjs';

const router = Router();

router.post('/add/:movieId', isAuth, validateRatings, validate, addReview);
router.patch('/:reviewId', isAuth, validateRatings, validate, updateReview);
router.delete('/:reviewId', isAuth, removeReview);
router.get('/get-reviews-by-movie/:movieId', getReviewsByMovie)

export default router;
