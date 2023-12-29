import { Router } from 'express';

import { addReview, updateReview, removeReview } from '../controllers/review.mjs';
import { uploadImage } from '../middlewares/multer.mjs';
import { validateRatings, validate } from '../middlewares/validator.mjs';
import { isAdmin, isAuth } from '../middlewares/auth.mjs';

const router = Router();

router.post('/add/:movieId', isAuth, validateRatings, validate, addReview);
router.patch('/:reviewId', isAuth, validateRatings, validate, updateReview);
router.delete('/:reviewId', isAuth, removeReview);

export default router;
