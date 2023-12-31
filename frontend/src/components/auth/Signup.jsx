import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import { commonModelClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { useNotification, useAuth } from '../../hooks';
import { createUser } from '../../api/auth';
import { isValidEmail } from '../../utils/helper';

const validateUserInfo = ({ name, email, password }) => {
	const isValidName = /^[a-z A-Z]+$/;

	if (!name.trim()) return { ok: false, error: 'Name is missing!' };
	if (!isValidName.test(name)) return { ok: false, error: 'Invalid name!' };

	if (!email.trim()) return { ok: false, error: 'Email is missing!' };
	if (!isValidEmail(email)) return { ok: false, error: 'Invalid email!' };

	if (!password.trim()) return { ok: false, error: 'Password is missing!' };
	if (password.length < 8) return { ok: false, error: 'Password mus be 8 characters long!' };

	return { ok: true };
};

const Signup = () => {
	const navigate = useNavigate();
    const {updateNotification} = useNotification()

    const { authInfo} = useAuth()
    const {isLoggedIn} = authInfo

	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = userInfo;

	const handleChange = ({ target }) => {
		const { value, name } = target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { ok, error } = validateUserInfo(userInfo);

		if (!ok) return updateNotification('error', error);

		const response = await createUser(userInfo);
		if (response.error) return updateNotification('error', response.error);

		navigate('/auth/verification', { state: { user: response }, replace: true });
	};

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn, navigate])

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses}>
					<Title>Sign Up</Title>
					<FormInput
						placeholder="Jhon Doe"
						name="name"
						labelName="Name"
						value={name}
						onChange={handleChange}
					/>
					<FormInput
						placeholder="Jhon@gmail.com"
						name="email"
						labelName="Email"
						value={email}
						onChange={handleChange}
					/>
					<FormInput
						placeholder="********"
						name="password"
						labelName="Password"
						value={password}
						type="password"
						onChange={handleChange}
					/>
					<SubmitBtn>Sign Up</SubmitBtn>
					<div className="flex justify-between">
						<CustomLink link="/auth/forget-password">Forget Password</CustomLink>
						<CustomLink link="/auth/signin">Sign In</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default Signup;
