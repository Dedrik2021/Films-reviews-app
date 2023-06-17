import { isValidObjectId } from 'mongoose';

import User from '../models/user.mjs';
import EmailVerificationToken from '../models/emailVerificationToken.mjs';
import { generateMailTransporter, generateOTP } from '../utils/mail.mjs';
import { sendError } from '../utils/helper.mjs';

const create = async (req, res) => {
	const { name, email, password } = req.body;

	const oldUser = await User.findOne({ email });
	if (oldUser) return sendError(res, 'This email already in use!')

	const newUser = new User({ name, email, password });
	await newUser.save();

	// generate 6 digit otp
	let OTP = generateOTP()

	// store otp inside our db
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: newUser._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	//send that otp to our user
	const transport = generateMailTransporter()

	transport.sendMail({
		from: 'verification@reviewapp.com',
		to: newUser.email,
		subject: 'Email Verification',
		html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `,
	});

	res.status(201).json({
		message: 'Please verify your email. OTP has been sent to your email address!',
	});
};

const verifyEmail = async (req, res) => {
	const { userId, OTP } = req.body;

	if (!isValidObjectId(userId)) return sendError(res, 'Invalid user id!')
	const user = await User.findById(userId);
	if (!user) return sendError(res, 'User not found!', 404) 
	if (user.isVerified) return sendError(res, 'User is already verified!') 

	const token = await EmailVerificationToken.findOne({ owner: userId });
	if (!token) return sendError(res, 'Token not found!', 404)

	const isMatched = await token.compaireToken(OTP);
	if (!isMatched) return sendError(res, 'Please submit a valid OTP!') 
	user.isVerified = true;
	await user.save();

	await EmailVerificationToken.findByIdAndDelete(token._id);

	const transport = generateMailTransporter()

	transport.sendMail({
		from: 'verification@reviewapp.com',
		to: user.email,
		subject: 'Welcome Email',
		html: `<h1>Welcome to our app and thanks for choosing us</h1>`,
	});

	res.status(201).json({ message: 'Your email is verified!' });
};

const resendEmailVerifivationToken = async (req, res) => {
	const { userId } = req.body;

	const user = await User.findById(userId);
	if (!user) return sendError(res, 'User not found!', 404) 

	if (user.isVerified)
		return sendError(res, 'This email id is already verivied!') 

	const alreadyHasToken = await EmailVerificationToken.findOne({ owner: userId });
	if (alreadyHasToken)
		return sendError(res, 'Only after one hour you can request for another token!')

	let OTP = generateOTP()

	// store otp inside our db
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: user._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	const transport = generateMailTransporter()

	transport.sendMail({
		from: 'verification@reviewapp.com',
		to: user.email,
		subject: 'Welcome Email',
		html: `<h1>Welcome to our app and thanks for choosing us</h1>`,
	});

	res.status(201).json({ message: 'New OTP has been sent to your registered email address!' });
};

export { create, verifyEmail, resendEmailVerifivationToken };
