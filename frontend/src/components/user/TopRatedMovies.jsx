import { useState, useEffect } from 'react';

import GridContainer from '../GridContainer';
import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';

const TopRatedMovies = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async () => {
		const { error, movies } = await getTopRatedMovies();
		if (error) return updateNotification('error', error);

		setMovies([...movies]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	const trimTitle = (text = '') => {
		if (text.length <= 20) return text;
		return text.substring(0, 20) + '..';
	};

	return (
		<GridContainer>
			{movies.map((movie) => {
				return (
					<div key={movie.id}>
						<img
							className="aspect-video object-cover"
							src={movie.poster}
							alt={movie.title}
						/>
						<h1 title={movie.title}>{trimTitle(movie.title)}</h1>
					</div>
				);
			})}
		</GridContainer>
	);
};

export default TopRatedMovies;
