import { createContext, useState } from 'react';

import { signinUser } from '../../api/auth';

export const AuthContext = createContext();

const defaultAuthInfo = {
	profile: null,
	isLoggedin: false,
	isPending: false,
	error: '',
};

const AuthProvider = ({ children }) => {
	const [authInfo, setAuthInfo] = useState({
		...defaultAuthInfo,
	});

	const handleLogin = async (email, password) => {
		setAuthInfo({ ...authInfo, isPending: true });
		const { error, user } = await signinUser({ email, password });
		if (error) {
			return setAuthInfo({ ...authInfo, isPending: false, error });
		}

		setAuthInfo({ profile: { ...user }, isLoggedIn: true, isPending: false, error: '' });

        localStorage.setItem('auth-token', user.token);
	};

	return (
		<AuthContext.Provider value={{ authInfo, handleLogin }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
