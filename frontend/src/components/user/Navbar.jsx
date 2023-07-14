import { BsFillSunFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useTheme } from '../../hooks';
import Container from '../Container';
import { useAuth } from '../../hooks';

const Navbar = () => {
	const { toggleTheme } = useTheme();
	const { authInfo, handleLogout } = useAuth();
	const { isLoggedIn } = authInfo;

	return (
		<div className="bg-secondary shadow-sm shadow-gray-500 ">
			<Container className="p-2">
				<div className="flex justify-between items-center">
					<Link to="/">
						<img className="h-10 object-cover" src="./logo.png" alt="logo" />
					</Link>
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleTheme}
							className="dark:bg-white bg-dark-subtle p-1 rounded"
						>
							<BsFillSunFill className="text-secondary" size={24} />
						</button>
						<label htmlFor="search"></label>
						<input
							type="text"
							className="border-2 border-dark-subtle pt-1 pr-2 pl-2 pb-1 rounded bg-transparent text-xl focus:border-white outline-none text-white"
							placeholder="Search..."
							id="search"
						/>
						{isLoggedIn ? (
							<button
								className="text-white text-lg font-semibold"
								onClick={handleLogout}
							>
								Log out
							</button>
						) : (
							<Link to="/auth/signin" className="text-white text-lg font-semibold">
								Login
							</Link>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
