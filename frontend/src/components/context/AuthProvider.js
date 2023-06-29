import { createContext, useState, useEffect } from 'react';

import { signinUser, getIsAuth } from '../../api/auth';

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

	const isAuth = async () => {
		const token = localStorage.getItem('auth-token');
		if (!token) return;
		setAuthInfo({ ...authInfo, isPending: true });
		const { error, user } = await getIsAuth(token);

		if (error) {
			return setAuthInfo({ ...authInfo, isPending: false, error });
		}

		setAuthInfo({ profile: { ...user }, isLoggedIn: true, isPending: false, error: '' });
	};

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        setAuthInfo({...defaultAuthInfo})
    }

    useEffect(() => {
        isAuth()
    }, [])

	return (
		<AuthContext.Provider value={{ authInfo, handleLogin, handleLogout, isAuth }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
