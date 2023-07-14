import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { FaUserNinja } from 'react-icons/fa';

const Dashboard = () => {
	return (
		<nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 pl-5">
			<Link to="/">
				<img className="h-14 p-2" src="../logo.png" alt="logo" />
			</Link>

			<ul>
				<li>
					<NavItem to="/">
						<AiOutlineHome />
						<span>Home</span>
					</NavItem>
				</li>
				<li>
					<NavItem to="/movies">
						<BiMoviePlay />
						<span>Movies</span>
					</NavItem>
				</li>
				<li>
					<NavItem to="/actors">
						<FaUserNinja />
						<span>Actor</span>
					</NavItem>
				</li>
			</ul>
		</nav>
	);
};

const NavItem = ({ children, to }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex items-center text-lg space-x-2 p-2 hover:opacity-80 transition ${
					isActive ? 'text-white' : 'text-gray-400'
				}`
			}
		>
			{children}
		</NavLink>
	);
};

export default Dashboard;
