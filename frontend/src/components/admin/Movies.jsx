import { useState, useEffect } from 'react';

import MovieListItem from '../MovieListItem';
import { getMovieForUpdate, getMovies } from '../../api/movie';
import { useNotification } from '../../hooks';
import NextAndPrevBtns from '../NextAndPrevBtns';
import UpdateMovie from '../Modals/UpdateMovie';
import ConfirmModal from '../Modals/ConfirmModal';

const limit = 10;
let currentPageNo = 0;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [rachedToEnd, setRachedToEnd] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const { updateNotification } = useNotification();

	const fetchMovies = async (pageNo) => {
		const { error, movies } = await getMovies(pageNo, limit);
		if (error) updateNotification('error', error);

		if (!movies.length) {
			currentPageNo = pageNo - 1;
			return setRachedToEnd(true);
		}

		setMovies([...movies]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	const handleOnNextClick = () => {
		if (rachedToEnd) return;
		currentPageNo += 1;
		fetchMovies(currentPageNo);
	};

	const handleOnPrevClick = () => {
		if (currentPageNo <= 0) return;
		if (rachedToEnd) setRachedToEnd(false);

		currentPageNo -= 1;
		fetchMovies(currentPageNo);
	};

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
		setShowConfirmModal(true)
	};

	const handleOnDeleteConfirm = () => {
		
	};

	return (
		<>
			<div className="space-y-3 p-5">
				{movies.map((movie) => {
					return (
						<MovieListItem
							key={movie.id}
							movie={movie}
							onEditClick={() => handleOnEditClick(movie)}
							onDeleteClick={() => handleOnDeleteClick(movie)}
						/>
					);
				})}

				{movies.length > 10 ? (
					<NextAndPrevBtns
						className="mt-5"
						onNextClick={handleOnNextClick}
						onPrevClick={handleOnPrevClick}
					/>
				) : null}
			</div>
			<ConfirmModal
				visible={showConfirmModal}
				onConfirm={handleOnDeleteConfirm}
				onCancel={hideConfirmModal}
				title="Are you sure?"
				subtitle="This action will be remove movie permanently!"
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
