import { useState, useEffect } from 'react';

import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';
import MovieList from './MovieList';

const TopRatedMovies = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async (signal) => {
		const { error, movies } = await getTopRatedMovies(null, signal);
		if (error) return updateNotification('error', error);

		setMovies([...movies]);
	};

	useEffect(() => {
		const ac = AbortController()
		fetchMovies(ac.signal);
		return () => {
			ac.abort()
		}
	}, []);

	return <MovieList title="Viewers choice (Movies)" movies={movies} />;
};

export default TopRatedMovies;
