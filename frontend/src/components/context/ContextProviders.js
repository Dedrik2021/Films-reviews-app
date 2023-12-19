import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';
import SearchProvider from './SearchProvider';
import MoviesProvider from './MoviesProvider';

const ContextProviders = ({ children }) => {
	return (
		<NotificationProvider>
			<SearchProvider>
				<MoviesProvider>
					<AuthProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</AuthProvider>
				</MoviesProvider>
			</SearchProvider>
		</NotificationProvider>
	);
};

export default ContextProviders;
