import express from 'express';

import {
	create,
	verifyEmail,
	resendEmailVerifivationToken,
	forgetPassword,
	sendResetPassordTokenStatus,
    resetPassword,
    signIn
} from '../controllers/user.mjs';
import { userValidator, validate, validatePassword, signInValidator } from '../middlewares/validator.mjs';
import { isValidPassResetToken } from '../middlewares/user.mjs';

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerifivationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPassordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword)

export default router;
