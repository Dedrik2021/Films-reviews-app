import { useState, useEffect } from 'react';

import MovieListItem from '../MovieListItem';
import { getMovies } from '../../api/movie';
import { useNotification } from '../../hooks';
import NextAndPrevBtns from '../NextAndPrevBtns';
import UpdateMovie from '../Modals/UpdateMovie';

const limit = 10;
let currentPageNo = 0;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [rachedToEnd, setRachedToEnd] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

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

	const handleOnEditClick = (movie) => {
		console.log(movie);
        setShowUpdateModal(true)
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
			<UpdateMovie visible={showUpdateModal} />
		</>
	);
};

export default Movies;
