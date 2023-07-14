import { Route, Routes } from 'react-router-dom';

import Dashboard from '../components/admin/Dashboard';
import Movies from '../components/admin/Movies';
import Actors from '../components/admin/Actors';
import NotFound from '../components/NotFound';
import Navbar from '../components/admin/Navbar';

const AdminNavigator = () => {
	return (
		<div className="flex">
			<Navbar />
			<div className="flex-1 p-2 max-w-screen-xl">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/actors" element={<Actors />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default AdminNavigator;
