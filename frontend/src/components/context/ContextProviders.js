import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';

const ContextProviders = ({ children }) => {
	return (
		<NotificationProvider>
			<AuthProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</AuthProvider>
		</NotificationProvider>
	);
};

export default ContextProviders;
