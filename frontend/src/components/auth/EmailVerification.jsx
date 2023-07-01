import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '../Container';
import Title from '../form/Title';
import SubmitBtn from '../form/SubmitBtn';
import FormContainer from '../form/FormContainer';
import { verifyUserEmail, resendEmailVerificationToken } from '../../api/auth';
import { useNotification, useAuth } from '../../hooks';

const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
	let valid = false;

	for (const val of otp) {
		valid = !isNaN(parseInt(val));
		if (!valid) break;
	}

	return valid;
};

const EmailVerification = () => {
	const { updateNotification } = useNotification();
	const { isAuth, authInfo } = useAuth();
	const { isLoggedIn, profile } = authInfo;
	const isVerified = profile?.isVerified;

	const navigate = useNavigate();
	const { state } = useLocation();
	const user = state?.user;

	const inputRef = useRef();
	const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
	const [activeOtpIndex, setActiveOtpIndex] = useState(0);

	const focusNextInputField = (index) => {
		setActiveOtpIndex(index + 1);
	};

	const focusPrevInputField = (index) => {
		let nextIndex;
		const diff = index - 1;
		nextIndex = diff !== 0 ? diff : 0;
		setActiveOtpIndex(nextIndex);
	};

	const handleOtpChange = ({ target }, index) => {
		const { value } = target;
		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1, value.length);

		if (!value) focusPrevInputField(index);
		else focusNextInputField(index);

		setOtp([...newOtp]);
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	const handleKeyDown = ({ key }, index) => {
		if (key === 'Backspace' && !otp[index]) {
			focusPrevInputField(index);
		}
	};

	useEffect(() => {
		if (isLoggedIn && isVerified) navigate('/');
		if (!user) navigate('/not-found');
	}, [user, isLoggedIn, isVerified]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!isValidOTP(otp)) return updateNotification('error', 'Invalid OTP');

		const {
			error,
			message,
			user: userResponse,
		} = await verifyUserEmail({ OTP: otp.join(''), userId: user.id });

		if (error) return updateNotification('error', error);
		updateNotification('success', message);
		localStorage.setItem('auth-token', userResponse.token);
		isAuth();
	};

    const handleOTPResend = async () => {
        const {error, message} = await resendEmailVerificationToken(user.id)

        if (error) return updateNotification('error', error)
        updateNotification('success', message)
    }

	return (
		<FormContainer>
			<Container>
				<form
					onSubmit={handleSubmit}
					className="dark:bg-secondary bg-white drop-shadow-lg rounded p-4 space-y-4"
				>
					<div>
						<Title>Please Enter Your OTP To Verify Your Account</Title>
						<p className="text-center dark:text-dark-subtle text-light-subtle">
							OTP has been sent to your email
						</p>
					</div>
					<div className="text-center space-x-6">
						{otp.map((_, index) => {
							return (
								<input
									ref={activeOtpIndex === index ? inputRef : null}
									key={index}
									value={otp[index] || ''}
									onChange={(e) => handleOtpChange(e, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									type="number"
									className="w-12 h-12 border-2 dark:border-dark-subtle dark:focus:border-white focus:border-primary rounded border-light-subtle bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
								/>
							);
						})}
					</div>
					<div>
						<SubmitBtn>Verify Account</SubmitBtn>
						<button onClick={handleOTPResend} className='dark:text-white text-blue-500 font-semibold hover:underline mt-2' type="button">I don't have OTP?</button>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default EmailVerification;
