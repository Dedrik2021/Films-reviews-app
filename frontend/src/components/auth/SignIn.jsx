import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';

const SignIn = () => {
	return (
		<div className="fixed inset-0 bg-primary -z-10 flex fjustify-center items-center">
			<Container>
				<form className="bg-secondary rounded p-4 w-96 space-y-4">
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
		</div>
	);
};

export default SignIn;
