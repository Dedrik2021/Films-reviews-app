import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const generateOTP = (otp_length = 6) => {
	// generate 6 digit otp
	let OTP = '';
	for (let i = 0; i < otp_length; i++) {
		const randomVal = Math.round(Math.random() * 9);
		OTP += randomVal;
	}

	return OTP;
};

const transport = nodemailer.createTransport({
	service: process.env.EMAIL_HOST,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export { generateOTP, transport };
