import { Link, NavLink } from 'react-router-dom';

const Dashboard = () => {
	return (
		<nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 pl-5">
			<Link to="/">
				<img className='h-14 p-2' src="../logo.png" alt="logo" />
			</Link>

            <ul>
                <li>
                    <NavItem to='/'>Home</NavItem>
                </li>
                <li>
                    <NavItem to='/movies'>Movies</NavItem>
                </li>
                <li>
                    <NavItem to='/actors'>Actors</NavItem>
                </li>
            </ul>
		</nav>
	);
};

const NavItem = ({children, to}) => {
    return (
        <NavLink to={to} className={({isActive}) => isActive ? "text-white" : "text-gray-400"}>{children}</NavLink>
    )
}

export default Dashboard;
