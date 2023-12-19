import { useState, useEffect } from 'react';

import MovieListItem from '../MovieListItem';
import { getMovieForUpdate, deleteMovie } from '../../api/movie';
import { useNotification } from '../../hooks';
import NextAndPrevBtns from '../NextAndPrevBtns';
import UpdateMovie from '../Modals/UpdateMovie';
import ConfirmModal from '../Modals/ConfirmModal';
import { useMovies } from '../../hooks';

const limit = 10;
let currentPageNo = 0;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [busy, setBusy] = useState(false);

	const { updateNotification } = useNotification();
	const { fetchMovies, movies: newMovies, fetchOnNextPage, fetchOnPrevPage } = useMovies();

	useEffect(() => {
		fetchMovies();
	}, []);

	const handleOnEditClick = async ({ id }) => {
		const { movie, error } = await getMovieForUpdate(id);
		if (error) return updateNotification('error', error);

		setSelectedMovie(movie);
		setShowUpdateModal(true);
	};

	const hideUpdateForm = () => {
		setShowUpdateModal(false);
	};

	const hideConfirmModal = () => {
		setShowConfirmModal(false);
	};

	const handleOnUpdate = (movie) => {
		const updatedMovies = movies.map((m) => {
			if (m.id === movie.id) return movie;
			return m;
		});
		setMovies([...updatedMovies]);
	};

	const handleOnDeleteClick = (movie) => {
		setSelectedMovie(movie);
		setShowConfirmModal(true);
	};

	const handleOnDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteMovie(selectedMovie.id);
		setBusy(false);

		if (error) return updateNotification('error', error);

		updateNotification('success', message);
		hideConfirmModal();
		fetchMovies(currentPageNo);
	};

	return (
		<>
			<div className="space-y-3 p-5">
				{newMovies.map((movie) => {
					return (
						<MovieListItem
							key={movie.id}
							movie={movie}
							onEditClick={() => handleOnEditClick(movie)}
							onDeleteClick={() => handleOnDeleteClick(movie)}
						/>
					);
				})}

				{newMovies.length > 10 ? (
					<NextAndPrevBtns
						className="mt-5"
						onNextClick={fetchOnNextPage}
						onPrevClick={fetchOnPrevPage}
					/>
				) : null}
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
				onSuccess={handleOnUpdate}
				onClose={hideUpdateForm}
			/>
		</>
	);
};

export default Movies;
