import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useNotification } from '../../hooks';
import { getSingleMovie } from '../../api/movie';
import Container from '../Container';
import RatingStar from '../RatingStar';
import RelatedMovies from '../RelatedMovies';
import { useAuth } from '../../hooks';

const SingleMovie = () => {
	const [ready, setReady] = useState(false);
	const [movie, setMovie] = useState({});

	const navigate = useNavigate()
	const {isLoggedIn} = useAuth()
	const { movieId } = useParams();
	const { updateNotification } = useNotification();

	const fetchMovie = async () => {
		const { error, movie } = await getSingleMovie(movieId);
		if (error) return updateNotification('error', error);
		setReady(true);
		setMovie(movie);
	};

	const convertDate = (date = '') => {
		return date.split('T')[0];
	};

	useEffect(() => {
		if (movieId) fetchMovie();
	}, [movieId]);

	const convertReviewCount = (count) => {
		if (count <= 999) return count;

		return parseFloat(count / 1000).toFixed(2) + 'k';
	};

	const handleOnRateMovie = () => {
		if (!isLoggedIn) return navigate('/auth/signin', {replace: true})
	}

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
		casts = [],
		language,
		releseDate,
		genres = [],
		type,
	} = movie;

	return (
		<div className="dark:bg-primary bg-white min-h-screen pb-10">
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
							onClick={handleOnRateMovie}
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
						<div className="flex space-x-2">
							{writers.map((w) => {
								return (
									<p
										key={w.id}
										className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
									>
										{w.name}
									</p>
								);
							})}
						</div>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Cast:
						</p>
						<div className="flex space-x-2">
							{casts.map((c) => {
								return c.leadActor ? (
									<p
										key={c.profile.id}
										className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
									>
										{c.profile.name}
									</p>
								) : null;
							})}
						</div>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Language:
						</p>
						<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
							{language}
						</p>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Release Date:
						</p>
						<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
							{convertDate(releseDate)}
						</p>
					</div>

					<div className="flex">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
							Genres:
						</p>
						<div className="flex space-x-2">
							{genres.map((g) => {
								return (
									<p key={g} className="text-highlight dark:text-highlight-dark ">
										{g}
									</p>
								);
							})}
						</div>
					</div>

					<div className="flex space-x-2">
						<p className="text-light-subtle dark:text-dark-subtle font-semibold">
							Type:
						</p>
						<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
							{type}
						</p>
					</div>
				</div>

				<div className="mt-5">
					<h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
						Cast:{' '}
					</h1>
					<div className="grid grid-cols-10">
						{casts.map((c) => {
							return (
								<div key={c.profile.id} className="flex flex-col items-center">
									<img
										className="w-24 h-24 aspect-square object-cover rounded-full"
										src={c.profile.avatar}
										alt=""
									/>
									<p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
										{c.profile.name}
									</p>
									<span className="text-light-subtle dark:text-dark-subtle text-sm">
										as
									</span>
									<p className="text-light-subtle dark:text-dark-subtle">
										{c.roleAs}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="mt-3">
					<RelatedMovies movieId={movieId} />
				</div>
			</Container>
		</div>
	);
};

export default SingleMovie;
