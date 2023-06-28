import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';

const ContextProviders = ({ children }) => {
	return (
		<AuthProvider>
			<NotificationProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</NotificationProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
