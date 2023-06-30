import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import { commonModelClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { useNotification } from '../../hooks';
import { useAuth } from '../../hooks';
import { isValidEmail } from '../../utils/helper';

const validateUserInfo = ({ email, password }) => {

	if (!email.trim()) return { ok: false, error: 'Email is missing!' };
	if (!isValidEmail(email)) return { ok: false, error: 'Invalid email!' };

	if (!password.trim()) return { ok: false, error: 'Password is missing!' };
	if (password.length < 8) return { ok: false, error: 'Password mus be 8 characters long!' };

	return { ok: true };
};

const SignIn = () => {
    const {updateNotification} = useNotification()
    const navigate = useNavigate()
    const {handleLogin, authInfo} = useAuth()
    const {isPending, isLoggedIn} = authInfo

    const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});

    const handleChange = ({ target }) => {
		const { value, name } = target;
		setUserInfo({ ...userInfo, [name]: value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		const { ok, error } = validateUserInfo(userInfo);

		if (!ok) return updateNotification('error', error);
        await handleLogin(userInfo.email, userInfo.password)
	};
    
    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn, navigate])
    
	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses}>
					<Title>Sign In</Title>
					<FormInput 
                        placeholder="Jhon@gmail.com"
                        name="email"
                        labelName="Email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
					<FormInput 
                        placeholder="********"
                        name="password"
                        labelName="Password"
                        value={userInfo.password}
                        onChange={handleChange}
                        type="password"
                    />
                    <SubmitBtn busy={isPending}>Sign In</SubmitBtn>
                    <div className="flex justify-between">
                        <CustomLink link="/auth/forget-password">Forget Password</CustomLink>
                        <CustomLink link="/auth/signup">Sign Up</CustomLink>
                    </div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default SignIn;
