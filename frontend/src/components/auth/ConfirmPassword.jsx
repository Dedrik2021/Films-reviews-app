import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import FormContainer from '../form/FormContainer';
import { commonModelClasses } from '../../utils/theme';

const ConfirmPassword = () => {
	return (
		<FormContainer>
			<Container>
				<form className={commonModelClasses}>
					<Title>Please Enter New Password</Title>
					<FormInput
						type="password"
						placeholder="********"
						name="password"
						labelName="New Password"
					/>
					<FormInput
						type="password"
						placeholder="********"
						name="confirm-password"
						labelName="Confirm Password"
					/>
					<SubmitBtn>Confirm Password</SubmitBtn>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ConfirmPassword;
