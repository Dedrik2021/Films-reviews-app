import express from 'express';

import {
	create,
	verifyEmail,
	resendEmailVerifivationToken,
	forgetPassword,
	sendResetPassordTokenStatus,
	resetPassword,
	signIn,
} from '../controllers/user.mjs';
import {
	userValidator,
	validate,
	validatePassword,
	signInValidator,
} from '../middlewares/validator.mjs';
import { isValidPassResetToken } from '../middlewares/user.mjs';
import { isAuth } from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/create', userValidator, validate, create);
router.post('/sign-in', signInValidator, validate, signIn);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerifivationToken);
router.post('/forget-password', forgetPassword);
router.post('/verify-pass-reset-token', isValidPassResetToken, sendResetPassordTokenStatus);
router.post('/reset-password', validatePassword, validate, isValidPassResetToken, resetPassword);

router.get('/is-auth', isAuth, (req, res) => {
	const { user } = req;
	res.status(201).json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			isVerified: user.isVerified,
		},
	});
});

export default router;
