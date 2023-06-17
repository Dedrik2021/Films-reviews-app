import nodemailer from 'nodemailer';

const generateOTP = (otp_length = 6) => {
	// generate 6 digit otp
	let OTP = '';
	for (let i = 0; i < otp_length; i++) {
		const randomVal = Math.round(Math.random() * 9);
		OTP += randomVal;
	}

	return OTP;
};

const generateMailTransporter = () => {
	nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '42a0dc509c2bde',
			pass: '21f921996c6388',
		},
	});
};

export { generateOTP, generateMailTransporter };
