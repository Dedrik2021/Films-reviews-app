import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';

const ConfirmPassword = () => {
	return (
		<div className="fixed inset-0 bg-primary -z-10 flex fjustify-center items-center">
			<Container>
				<form className="bg-secondary rounded p-4 w-96 space-y-4">
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
		</div>
	);
};

export default ConfirmPassword;
