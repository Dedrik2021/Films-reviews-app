import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ImSpinner3 } from 'react-icons/im';

import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import FormContainer from '../form/FormContainer';
import { commonModelClasses } from '../../utils/theme';
import { verifyPasswordResetToken, resetPassword } from '../../api/auth';
import { useNotification } from '../../hooks';

const ConfirmPassword = () => {
    const [password, setPassword] = useState({
        one: '',
        two: ''
    })
	const [isVerifying, setIsVerifying] = useState(true);
	const [isValid, setIsValid] = useState(false);

	const { updateNotification } = useNotification();
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const id = searchParams.get('id');

    useEffect(() => {
        isValidToken()
    }, [])

	const isValidToken = async () => {
        const { error, valid } = await verifyPasswordResetToken(token, id);
        setIsVerifying(false)
		if (error) {
            navigate('/auth/reset-password', { replace: true });
            return updateNotification('error', error)
        };

		if (!valid) {
			setIsValid(false);
			return navigate('/auth/reset-password', { replace: true });
		}

        setIsValid(true)
	};

	if (!isValid) {
		return (
			<FormContainer>
				<Container>
					<h1 className="text-4xl font-semibold dark:text-white text-primary">
						Sorry the token is invalid!
					</h1>
				</Container>
			</FormContainer>
		);
	}

	if (isVerifying) {
		return (
			<FormContainer>
				<Container>
					<div className="flex space-x-2 items-center">
						<h1 className="text-4xl font-semibold dark:text-white text-primary">
							Please wait we are verifying your token!
						</h1>
						<ImSpinner3 className="animate-spin text-4xl dark:text-white" />
					</div>
				</Container>
			</FormContainer>
		);
	}

    const handleChange = ({target}) => {
        const {name, value} = target
        setPassword({...password, [name]: value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password.one.trim()) return updateNotification('error', "Password is missing!")
        if (password.one.trim().length < 8) return updateNotification('error', "Password must be 8 haracters long!")

        if (password.one !== password.two) return updateNotification('error', "Password do not match!")

        const {error, message} = await resetPassword({newPassword: password.one, userId: id, token})

        if (error) {
			return updateNotification('error', error)
		}

        updateNotification('success', message)
        navigate('/auth/signin', {replace: true})
    }

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses}>
					<Title>Please Enter New Password</Title>
					<FormInput
						type="password"
						placeholder="********"
						name="one"
						labelName="New Password"
                        value={password.one}
                        onChange={handleChange}
					/>
					<FormInput
						type="password"
						placeholder="********"
						name="two"
						labelName="Confirm Password"
                        value={password.two}
                        onChange={handleChange}
					/>
					<SubmitBtn>Confirm Password</SubmitBtn>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ConfirmPassword;
