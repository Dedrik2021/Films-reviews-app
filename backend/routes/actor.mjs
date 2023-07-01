import { Router } from 'express';

import { createActor } from '../controllers/actor.mjs';
import { uploadImage } from '../middlewares/multer.mjs';
import { validatorActorInfo, validate } from '../middlewares/validator.mjs';

const router = Router();

router.post('/create', uploadImage.single('avatar'), validatorActorInfo, validate, createActor);

export default router;
