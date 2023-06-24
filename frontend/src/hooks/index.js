import { useContext } from 'react';
import { ThemeContext } from '../components/context/ThemeProvider';

const useTheme = () => {
	return useContext(ThemeContext);
};

export default useTheme;
