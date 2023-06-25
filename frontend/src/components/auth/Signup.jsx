import {useState} from 'react'

import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import SubmitBtn from '../form/SubmitBtn';
import CustomLink from '../CustomLink';
import { commonModelClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = userInfo

    const handleChange = ({target}) => {
        const {value, name} = target
        setUserInfo({...userInfo, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userInfo);
    }

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
                        type='password'
                        onChange={handleChange}
                    />
                    <SubmitBtn>Sign Up</SubmitBtn>
                    <div className="flex justify-between">
                        <CustomLink link="/auth/forget-password" >Forget Password</CustomLink>
                        <CustomLink link="/auth/signin">Sign In</CustomLink>
                    </div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default Signup;
