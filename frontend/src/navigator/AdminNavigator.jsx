import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Dashboard from '../components/admin/Dashboard';
import Movies from '../components/admin/Movies';
import Actors from '../components/admin/Actors';
import NotFound from '../components/NotFound';
import Navbar from '../components/admin/Navbar';
import Header from '../components/admin/Header';
import MovieUpload from '../components/admin/MovieUpload';
import ActorUpload from '../components/Modals/ActorUpload';

const AdminNavigator = () => {
	const [showMovieUploadModal, setShowMovieUploadModal] = useState(false)
	const [showActorUploadModal, setShowActorUploadModal] = useState(false)

	const displayMovieUploadModal = () => {
		setShowMovieUploadModal(true)
	}

	const hideMovieUploadModal = () => {
		setShowMovieUploadModal(false)
	}

	const displayActorUploadModal = () => {
		setShowActorUploadModal(true)
	}

	const hideActorUploadModal = () => {
		setShowActorUploadModal(false)
	}

	return (
		<>
			<div className="flex bg-white dark:bg-primary">
				<Navbar />
				<div className="flex-1 max-w-screen-xl">
					<Header
						onAddActorClick={displayActorUploadModal}
						onAddMovieClick={displayMovieUploadModal}
					/>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/actors" element={<Actors />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
			<MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal} />
			<ActorUpload visible={showActorUploadModal} onClose={hideActorUploadModal} />
		</>
	);
};

export default AdminNavigator;
