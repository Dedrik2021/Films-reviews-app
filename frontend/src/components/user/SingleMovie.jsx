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

	const convertReviewCount = (count) => {
		if (count <= 999) return count;

		return parseFloat(count / 1000).toFixed(2) + 'k';
	};

	if (!ready)
		return (
			<div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
				<p className="text-light-subtle dark:text-dark-subtle animate-pulse">Please wait</p>
			</div>
		);

	const {
		id,
		trailer,
		poster,
		title,
		storyLine,
		director = {},
		reviews = {},
		writers = [],
	} = movie;

	return (
		<div className="dark:bg-primary bg-white min-h-screen">
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
							{convertReviewCount(reviews.reviewCount)} Reviews
						</Link>

						<button
							type="button"
							className="text-highlight dark:text-highlight-dark hover:underline"
						>
							Rate The Movie
						</button>
					</div>
				</div>

				<div className="space-y-3">
					<p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Director:
						</p>
						<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
							{director.name}
						</p>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Writers:
						</p>
						<div className="space-x-2">
							{writers.map((w) => {
								return (
									<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
										{w.name}
									</p>
								);
							})}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SingleMovie;
