import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';

const ForgetPassword = () => {
	return (
		<div className="fixed inset-0 bg-primary -z-10 flex fjustify-center items-center">
			<Container>
				<form className="bg-secondary rounded p-4 w-96 space-y-4">
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
		</div>
	);
};

export default ForgetPassword;
