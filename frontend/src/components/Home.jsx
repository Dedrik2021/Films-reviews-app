import {useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks';
import Container from './Container';

const Home = () => {
    const navigate = useNavigate()

	const { authInfo } = useAuth();
    const {isLoggedIn} = authInfo
    const isVerified = authInfo.profile?.isVerified

    const navigateToVerification = () => {
        navigate('/auth/verification', {state: {user: authInfo.profile}})
    }

	return (
		<Container>
			{isLoggedIn && !isVerified ? (
                <p className='text-lg text-center bg-blue-50 p-2'>
				It looks like you haven't verified your accont,{' '}
				<button onClick={navigateToVerification} className='text-blue-500 font-semibold hover:underline' type="button">Click here to verified your account</button>
			</p>
            ) : null}
		</Container>
	);
};

export default Home;
