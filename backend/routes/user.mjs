import express from 'express';

import {
	create,
	verifyEmail,
	resendEmailVerifivationToken,
	forgetPassword,
	sendResetPassordTokenStatus,
    resetPassword,
} from '../controllers/user.mjs';
import { userValidator, validate, validatePassword } from '../middlewares/validator.mjs';
import { isValidPassResetToken } from '../middlewares/user.mjs';

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerifivationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPassordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword)

export default router;

// token=6011f2f0b8c3b3aa563a2980801326880e7da99e957483fd650d70959fe4&id=6494b5686014b5ce7d1f176c
