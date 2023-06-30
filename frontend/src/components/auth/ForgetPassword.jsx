import {useState} from 'react'

import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import { commonModelClasses } from '../../utils/theme';
import { useNotification } from '../../hooks';
import { forgetPassword } from '../../api/auth';
import { isValidEmail } from '../../utils/helper';

const ForgetPassword = () => {
    const {updateNotification} = useNotification()
    const [email, setEmail] = useState('')

    const handleChange = ({ target }) => {
		const { value} = target;
		setEmail(value);
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isValidEmail(email)) return updateNotification('error', 'Invalid email/Email is missing!')

        const {error, message} = await forgetPassword(email)
        if (error) return updateNotification('error', error)
        return updateNotification('success', message)
	};
    
	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses}>
					<Title>Please Enter Your Email</Title>
					<FormInput 
                        placeholder="Jhon@gmail.com"
                        name="email"
                        labelName="Email"
                        value={email}
                        onChange={handleChange}
                    />
                    <SubmitBtn>Send Link</SubmitBtn>
                    <div className="flex justify-between">
                        <CustomLink link="/auth/signin" >Sign In</CustomLink>
                        <CustomLink link="/auth/signup">Sign Up</CustomLink>
                    </div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ForgetPassword;
