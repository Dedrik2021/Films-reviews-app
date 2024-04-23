import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useNotification } from '../../hooks';
import { getSingleMovie } from '../../api/movie';
import Container from '../Container';
import RatingStar from '../RatingStar';
import RelatedMovies from '../RelatedMovies';
import { useAuth } from '../../hooks';
import AddRatingModal from '../Modals/AddRatingModal';
import CustomButtonLink from '../CustomButtonLink';

const SingleMovie = () => {
	const [ready, setReady] = useState(false);
	const [showRatingModal, setShowRatingModal] = useState(false);
	const [movie, setMovie] = useState({});

	const navigate = useNavigate();
	const { authInfo } = useAuth();
	const { isLoggedIn } = authInfo;
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

	const convertReviewCount = (count = 0) => {
		if (count <= 999) return count;

		return parseFloat(count / 1000).toFixed(2) + 'k';
	};

	const handleOnRateMovie = () => {
		if (!isLoggedIn) return navigate('/auth/signin', { replace: true });
		setShowRatingModal(true);
	};

	const hideRatingModal = () => {
		showRatingModal(false);
	};

	const onRatingSuccess = (reviews) => {
		setMovie({ ...movie, reviews: { ...reviews } });
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
		casts = [],
		language,
		releseDate,
		genres = [],
		type,
	} = movie;

	return (
		<div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container className="xl:px-0 px-2">
				<video src={trailer} poster={poster} controls></video>
				<div className="flex justify-between">
					<h1 className="xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3 ">
						{title}
					</h1>
					<div className="flex flex-col items-end">
						<RatingStar rating={reviews.ratingAvg} />
						<CustomButtonLink
							label={`${convertReviewCount(reviews.reviewCount)} Reviews`}
							onClick={() => navigate(`/movie/reviews/${id}`)}
						/>
						<CustomButtonLink label="Rate The Movie" onClick={handleOnRateMovie} />
					</div>
				</div>

				<div className="space-y-3">
					<p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

					<ListWithLabel label="Director:">
						<CustomButtonLink label={director.name} />
					</ListWithLabel>

					<ListWithLabel label="Writers:">
						{writers.map((w) => (
							<CustomButtonLink key={w.id} label={w.name} />
						))}
					</ListWithLabel>

					<ListWithLabel label="Cast:">
						{casts.map(({ id, profile, leadActor }) => {
							return leadActor ? (
								<CustomButtonLink key={id} label={profile.name} />
							) : null;
						})}
					</ListWithLabel>

					<ListWithLabel label="Language:">
						<CustomButtonLink label={language} />
					</ListWithLabel>

					<ListWithLabel label="Release Date:">
						<CustomButtonLink label={convertDate(releseDate)} />
					</ListWithLabel>

					<ListWithLabel label="Writers:">
						{genres.map((g) => (
							<CustomButtonLink key={g} label={g} clickable={false} />
						))}
					</ListWithLabel>

					<ListWithLabel label="Type:">
						<CustomButtonLink label={type} clickable={false} />
					</ListWithLabel>

					<CastProfiles casts={casts} />
					<RelatedMovies movieId={movieId} />
				</div>

			</Container>

			<AddRatingModal
				visible={showRatingModal}
				onClose={hideRatingModal}
				onSuccess={onRatingSuccess}
			/>
		</div>
	);
};

const ListWithLabel = ({ children, label }) => {
	return (
		<div className="flex space-x-2">
			<p className="text-light-subtle dark:text-dark-subtle font-semibold">{label}</p>
			{children}
		</div>
	);
};

const CastProfiles = ({casts}) => {
	return (
		<div className="">
			<h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
				Cast:{' '}
			</h1>
			<div className="flex flex-wrap space-x-4">
				{casts.map(({id, profile, roleAs}) => {
					return (
						<div
							key={id}
							className="basis-28 text-center mb-4 flex flex-col items-center"
						>
							<img
								className="w-24 h-24 aspect-square object-cover rounded-full"
								src={profile.avatar}
								alt=""
							/>

							<CustomButtonLink label={profile.name} />
							
							<span className="text-light-subtle dark:text-dark-subtle text-sm">
								as
							</span>
							<p className="text-light-subtle dark:text-dark-subtle">{roleAs}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SingleMovie;
