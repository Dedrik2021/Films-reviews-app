import { useContext } from 'react';

import { ThemeContext } from '../components/context/ThemeProvider';
import { NotificationContext } from '../components/context/NotificationProvider';

const useTheme = () => {
	return useContext(ThemeContext);
};

const useNotification = () => {
    return useContext(NotificationContext)
}

export {useTheme, useNotification}