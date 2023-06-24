import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import { commonModelClasses } from '../../utils/theme';

const ForgetPassword = () => {
	return (
		<FormContainer>
			<Container>
				<form className={commonModelClasses}>
					<Title>Please Enter Your Email</Title>
					<FormInput 
                        placeholder="Jhon@gmail.com"
                        name="email"
                        labelName="Email"
                    />
                    <SubmitBtn>Send Link</SubmitBtn>
                    <div className="flex justify-between">
                        <CustomLink link="/auth/signin" >Sign In</CustomLink>
                        <CustomLink link="/auth/signup">Sign Un</CustomLink>
                    </div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ForgetPassword;
