import { useState, useEffect } from 'react';

import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';
import MovieList from './MovieList';

const TopRatedWebSeries = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async (signal) => {
		const { error, movies } = await getTopRatedMovies("Web Series", signal);
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

	return <MovieList title="Viewers choice (Web Series)" movies={movies} />;
};

export default TopRatedWebSeries;
