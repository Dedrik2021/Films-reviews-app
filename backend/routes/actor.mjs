import { Router } from 'express';

import { createActor, updateActor } from '../controllers/actor.mjs';
import { uploadImage } from '../middlewares/multer.mjs';
import { validatorActorInfo, validate } from '../middlewares/validator.mjs';

const router = Router();

router.post('/create', uploadImage.single('avatar'), validatorActorInfo, validate, createActor);
router.post('/update/:actorId', uploadImage.single('avatar'), validatorActorInfo, validate, updateActor);

export default router;
