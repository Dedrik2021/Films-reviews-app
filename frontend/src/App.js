import { Route, Routes } from 'react-router-dom';

import Navbar from './components/user/Navbar';
import SignIn from './components/auth/SignIn';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';
import SingleMovie from './components/user/SingleMovie';
import MovieReviews from './components/user/MovieReviews';

const App = () => {
	const {authInfo} = useAuth()
	const isAdmin = authInfo.profile?.role === 'admin'
	
	if (isAdmin) return <AdminNavigator/>
	
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/signin" element={<SignIn />} />
				<Route path="/auth/signup" element={<Signup />} />

				<Route path="/auth/verification" element={<EmailVerification />} />
				<Route path="/auth/forget-password" element={<ForgetPassword />} />
				<Route path="/auth/reset-password" element={<ConfirmPassword />} />
				<Route path="/movie/:movieId" element={<SingleMovie />} />
				<Route path="/movie/reviews/:movieId" element={<MovieReviews />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
