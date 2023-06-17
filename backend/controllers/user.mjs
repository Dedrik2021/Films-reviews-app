import nodemailer from 'nodemailer'

import User from '../models/user.mjs';
import EmailVerificationToken from '../models/emailVerificationToken.mjs';

const create = async (req, res) => {
	const { name, email, password } = req.body;

	const oldUser = await User.findOne({ email });
	if (oldUser) return res.status(401).json({ error: 'This email already in use!' });

	const newUser = new User({ name, email, password });
	await newUser.save();

	// generate 6 digit otp
	let OTP = '';
	for (let i = 0; i < 5; i++) {
		const randomVal = Math.round(Math.random() * 9);
		OTP += randomVal;
	}

	// store otp inside our db
	const newEmailVerificationToken = new EmailVerificationToken({
		owner: newUser._id,
		token: OTP,
	});
	await newEmailVerificationToken.save();

	//send that otp to our user
	const transport = nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '42a0dc509c2bde',
			pass: '********6388',
		},
	});

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

export { create };
