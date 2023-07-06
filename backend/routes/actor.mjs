import { Router } from 'express';

import {
	createActor,
	updateActor,
	removeActor,
	searchActor,
	getLatestActors,
	getSingleActor,
} from '../controllers/actor.mjs';
import { uploadImage } from '../middlewares/multer.mjs';
import { validatorActorInfo, validate } from '../middlewares/validator.mjs';
import { isAdmin, isAuth } from '../middlewares/auth.mjs';

const router = Router();

router.post(
	'/create',
	isAuth,
	isAdmin,
	uploadImage.single('avatar'),
	validatorActorInfo,
	validate,
	createActor,
);

router.post(
	'/update/:actorId',
    isAuth,
	isAdmin,
	uploadImage.single('avatar'),
	validatorActorInfo,
	validate,
	updateActor,
);

router.delete('/:actorId', isAuth, isAdmin, removeActor);
router.get('/search', isAuth, isAdmin, searchActor);
router.get('/latest-uploads', isAuth, isAdmin, getLatestActors);
router.get('/single/:id', getSingleActor);

export default router;
