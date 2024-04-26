import { useState, useEffect } from 'react';

import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';
import MovieList from './MovieList';

const TopRatedTvSeries = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async (signal) => {
		const { error, movies } = await getTopRatedMovies("Tv Series", signal);
		if (error) return updateNotification('error', error);

		setMovies([...movies]);
	};

	useEffect(() => {
		const ac = new AbortController()
		fetchMovies(ac.signal);
		return () => {
			ac.abort()
		}
	}, []);

	return <MovieList title="Viewers choice (TV Series)" movies={movies} />;
};

export default TopRatedTvSeries;
