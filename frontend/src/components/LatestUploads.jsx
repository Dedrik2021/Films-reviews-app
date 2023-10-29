import { useState, useEffect } from 'react';

import MovieListItem from './MovieListItem';
import { deleteMovie, getMovieForUpdate, getMovies } from '../api/movie';
import { useNotification } from '../hooks';
import ConfirmModal from './Modals/ConfirmModal';
import UpdateMovie from './Modals/UpdateMovie';

const pageNo = 0;
const limit = 5;

const LatestUploads = () => {
	const [movies, setMovies] = useState([]);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [busy, setBusy] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getMovies(pageNo, limit);

		if (error) return updateNotification('error', error);
		setMovies([...movies]);
	};

	useEffect(() => {
		fetchLatestUploads();
	}, []);

	const handleOnDeleteClick = (movie) => {
		setSelectedMovie(movie)
		setShowConfirmModal(true)
	}

	const hideConfirmModal = () => {
		setShowConfirmModal(false)
	}

	const hideUpdateModal = () => {
		setShowUpdateModal(false)
	}

	const handleOnDeleteConfirm = async () => {
		setBusy(true)
		const {error, message} = await deleteMovie(selectedMovie.id)
		setBusy(false)

		if (error) return updateNotification('error', error)
		updateNotification('success', message)

		fetchLatestUploads()
		hideConfirmModal()
	}

	const handleOnEditClick = async ({id}) => {
		setShowUpdateModal(true)
		const {error, movie} = await getMovieForUpdate(id)
		if (error) return updateNotification('error', error)
		setSelectedMovie(movie)
	}

	return movies.length ? (
		<>
			<div className="bg-white dark:shadow shadow dark:bg-secondary p-5 rounded col-span-2">
				<h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
					Recent Uploads
				</h1>
				<div className="space-y-3">
					{movies.map((movie) => {
						return <MovieListItem movie={movie} key={movie.id} onDeleteClick={() => handleOnDeleteClick(movie)} onEditClick={() => handleOnEditClick(movie)} />;
					})}
				</div>
			</div>
			<ConfirmModal
				visible={showConfirmModal}
				onConfirm={handleOnDeleteConfirm}
				onCancel={hideConfirmModal}
				title="Are you sure?"
				subtitle="This action will be remove movie permanently!"
				busy={busy}
			/>
			<UpdateMovie
				visible={showUpdateModal}
				initialState={selectedMovie}
				onClose={hideUpdateModal}
			/>
		</>
	) : null;
};

export default LatestUploads;
