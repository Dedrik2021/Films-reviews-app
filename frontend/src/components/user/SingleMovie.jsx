import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useNotification } from '../../hooks';
import { getSingleMovie } from '../../api/movie';
import Container from '../Container';
import RatingStar from '../RatingStar';

const SingleMovie = () => {
	const [ready, setReady] = useState(false);
	const [movie, setMovie] = useState({});

	const { movieId } = useParams();
	const { updateNotification } = useNotification();

	const fetchMovie = async () => {
		const { error, movie } = await getSingleMovie(movieId);
		if (error) return updateNotification('error', error);
		setReady(true);
		setMovie(movie);
	};

	useEffect(() => {
		if (movieId) fetchMovie();
	}, [movieId]);

	if (!ready)
		return (
			<div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
				<p className="text-light-subtle dark:text-dark-subtle animate-pulse">Please wait</p>
			</div>
		);

	const { id, trailer, poster, title, reviews = {} } = movie;

	return (
		<div className="dark:bg-primary bg-white">
			<Container>
				<video src={trailer} poster={poster} controls></video>
				<div className="flex justify-between">
					<h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3 ">
						{title}
					</h1>
					<div className="flex flex-col items-end">
						<RatingStar rating={reviews.ratingAvg} />
						<Link
							className="text-highlight dark:text-highlight-dark hover:underline"
							to={`/movie/reviews/${id}`}
						>
							{reviews.reviewCount} Reviews
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SingleMovie;
