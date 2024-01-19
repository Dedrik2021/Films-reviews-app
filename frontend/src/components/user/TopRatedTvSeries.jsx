import { useState, useEffect } from 'react';

import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';
import MovieList from './MovieList';

const TopRatedTvSeries = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async () => {
		const { error, movies } = await getTopRatedMovies("Tv Series");
		if (error) return updateNotification('error', error);

		setMovies([...movies]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return <MovieList title="Viewers choice (TV Series)" movies={movies} />;
};

export default TopRatedTvSeries;
