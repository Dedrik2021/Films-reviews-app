import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.EMAIL_HOST;
const email_service = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

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
	service: host,
	auth: {
		user: email_service,
		pass: pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export { generateOTP, transport };
