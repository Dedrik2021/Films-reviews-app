import { useContext } from 'react';

import { ThemeContext } from '../components/context/ThemeProvider';
import { NotificationContext } from '../components/context/NotificationProvider';
import { AuthContext } from '../components/context/AuthProvider';
import { SearchContext } from '../components/context/SearchProvider';

const useTheme = () => {
	return useContext(ThemeContext);
};

const useNotification = () => {
	return useContext(NotificationContext);
};

const useAuth = () => {
	return useContext(AuthContext);
};

const useSearch = () => {
	return useContext(SearchContext)
}

export { useTheme, useNotification, useAuth, useSearch };
