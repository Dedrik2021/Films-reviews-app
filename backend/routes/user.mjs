import express from 'express';

import { create } from '../controllers/user.mjs';
import { userValidator, validate } from '../middlewares/validator.mjs';

const router = express.Router();

router.post(
	'/create',
	userValidator,
    validate,
	create,
);

export default router;
