import { useState, useRef, useEffect } from 'react';

import Container from '../Container';
import Title from '../form/Title';
import SubmitBtn from '../form/SubmitBtn';
import FormContainer from '../form/FormContainer';

const OTP_LENGTH = 6;

const EmailVerification = () => {
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

	return (
		<FormContainer>
			<Container>
				<form className="dark:bg-secondary bg-white drop-shadow-lg rounded p-4 space-y-4">
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
					<SubmitBtn>Send Link</SubmitBtn>
				</form>
			</Container>
		</FormContainer>
	);
};

export default EmailVerification;