import express from 'express';

import { create, verifyEmail, resendEmailVerifivationToken } from '../controllers/user.mjs';
import { userValidator, validate } from '../middlewares/validator.mjs';

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerifivationToken)

export default router;
