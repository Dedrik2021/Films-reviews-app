import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import { commonModelClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';

const SignIn = () => {
    
	return (
		<FormContainer>
			<Container>
				<form className={commonModelClasses}>
					<Title>Sign In</Title>
					<FormInput 
                        placeholder="Jhon@gmail.com"
                        name="email"
                        labelName="Email"
                    />
					<FormInput 
                        placeholder="********"
                        name="password"
                        labelName="Password"
                    />
                    <SubmitBtn>Sign In</SubmitBtn>
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
