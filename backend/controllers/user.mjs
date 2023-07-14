import { isValidObjectId } from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/user.mjs';
import EmailVerificationToken from '../models/emailVerificationToken.mjs';
import PasswordResetToken from '../models/passwordResetToken.mjs';
import { transport, generateOTP } from '../utils/mail.mjs';
import { sendError, generateRandomByte } from '../utils/helper.mjs';

dotenv.config();

const email_service = process.env.EMAIL;
const JWT_TOKEN = process.env.JWT_TOKEN;

const create = async (req, res) => {
	const { name, email, password } = req.body;

	const oldUser = await User.findOne({ email });
	if (oldUser) return sendError(res, 'This email already in use!');

	const newUser = new User({ name, email, password });
	await newUser.save();

	// generate 6 digit otp
	let OTP = generateOTP();

	// store otp inside our db
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: newUser._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	transport.sendMail({
		from: `Films Reviews <${email_service}>`,
		to: email,
		subject: 'Email Verification',
		html: `
	        <p>Your verification OTP</p>
	        <h1>${OTP}</h1>
	    `,
	});

	res.status(201).json({
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		},
	});
};

const verifyEmail = async (req, res) => {
	const { userId, OTP } = req.body;

	if (!isValidObjectId(userId)) return sendError(res, 'Invalid user id!');

	const user = await User.findById(userId);
	if (!user) return sendError(res, 'User not found!', 404);
	if (user.isVerified) return sendError(res, 'User is already verified!');

	const token = await EmailVerificationToken.findOne({ owner: userId });
	if (!token) return sendError(res, 'Token not found!', 404);

	const isMatched = await token.compareToken(OTP);
	if (!isMatched) return sendError(res, 'Please submit a valid OTP!');
	user.isVerified = true;
	await user.save();

	await EmailVerificationToken.findByIdAndDelete(token._id);

	transport.sendMail({
		from: `Films Reviews <${email_service}>`,
		to: user.email,
		subject: 'Welcome Email',
		html: `<h1>Welcome to our app and thanks for choosing us</h1>`,
	});

	const jwtToken = jwt.sign({ userId: user._id }, JWT_TOKEN);
	res.status(201).json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			token: jwtToken,
			role: user.role,
			isVerified: user.isVerified,
		},
		message: 'Your email is verified!',
	});
};

const resendEmailVerifivationToken = async (req, res) => {
	const { userId } = req.body;

	const user = await User.findById(userId);
	if (!user) return sendError(res, 'User not found!', 404);

	if (user.isVerified) return sendError(res, 'This email id is already verivied!');

	const alreadyHasToken = await EmailVerificationToken.findOne({ owner: userId });
	if (alreadyHasToken)
		return sendError(res, 'Only after one hour you can request for another token!');

	let OTP = generateOTP();

	const newEmailVerificationToken = new EmailVerificationToken({
		owner: user._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	transport.sendMail({
		from: `Films Reviews <${email_service}>`,
		to: user.email,
		subject: 'Welcome Email',
		html: `<h1>Welcome to our app and thanks for choosing us</h1>`,
	});

	res.status(201).json({ message: 'New OTP has been sent to your registered email address!' });
};

const forgetPassword = async (req, res) => {
	const { email } = req.body;

	if (!email) return sendError(res, 'Email is missing!');

	const user = await User.findOne({ email });
	if (!user) return sendError(res, 'User not found!', 404);

	const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
	if (alreadyHasToken)
		return sendError(res, 'Only after one hour you can request for another token!');

	const token = await generateRandomByte();
	const newPasswordResetToken = await PasswordResetToken({ owner: user._id, token });
	await newPasswordResetToken.save();

	const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

	transport.sendMail({
		from: `Films Reviews <${email_service}>`,
		to: user.email,
		subject: 'Reset Password Link',
		html: `
			<p>Click here to reset Password</p>
			<a href='${resetPasswordUrl}'>Change Password</a>
		`,
	});

	res.status(201).json({ message: 'Link sent to your email!' });
};

const sendResetPassordTokenStatus = (req, res) => {
	res.json({ valid: true });
};

const resetPassword = async (req, res) => {
	const { newPassword, userId } = req.body;

	const user = await User.findById(userId);
	const matched = await user.comparePassword(newPassword);
	if (matched) return sendError(res, 'The new password must be different from the old one!');

	user.password = newPassword;
	await user.save();

	await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

	transport.sendMail({
		from: `Films Reviews <${email_service}>`,
		to: user.email,
		subject: 'Password reset successfully!',
		html: `
			<h1>Password Reset Successfully</h1>
			<p>Now You Can Use New Password!</p>
		`,
	});

	res.status(201).json({ message: 'Password Reset Successfully! Now You Can Use New Password!' });
};

const signIn = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return sendError(res, 'Email/Password mismatch!');

	const matched = await user.comparePassword(password);
	if (!matched) return sendError(res, 'Email/Password mismatch!');

	const { _id, name, role, isVerified } = user;

	const jwtToken = jwt.sign({ userId: user._id }, JWT_TOKEN);
	res.status(201).json({
		user: { id: _id, name, role, email, token: jwtToken, role, isVerified },
	});
};

export {
	create,
	verifyEmail,
	resendEmailVerifivationToken,
	forgetPassword,
	sendResetPassordTokenStatus,
	resetPassword,
	signIn,
};
