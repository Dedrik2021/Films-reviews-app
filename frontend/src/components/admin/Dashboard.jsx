import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { FaUserNinja } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
	return (
		<nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 pl-5 pt-1 pb-5 flex flex-col justify-between">
			<div>
				<Link to="/" className='mb-8 block'>
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
							<span>Actors</span>
						</NavItem>
					</li>
				</ul>
			</div>
			<div className=" flex flex-col items-start">
				<span className='font-semibold text-white text-xl'>Admin</span>
				<button type="button" className="flex items-center space-x-2 text-dark-subtle text-sm hover:text-white transition">
					<FiLogOut />
					<span>Log out</span>
				</button>
			</div>
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
