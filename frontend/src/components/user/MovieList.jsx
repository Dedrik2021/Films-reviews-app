import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import GridContainer from '../GridContainer';

const trimTitle = (text = '') => {
    if (text.length <= 20) return text;
    return text.substring(0, 20) + '..';
};

const MovieList = ({ title, movies = [] }) => {

	if (!movies.length) return null;

	return (
		<div>
			<h1 className="text-2xl mb-5 dark:text-white text-secondary font-semibold">{title}</h1>
			<GridContainer>
				{movies.map((movie) => {
					return <ListItem id={movie.id} movie={movie} />;
				})}
			</GridContainer>
		</div>
	);
};

const ListItem = ({ movie }) => {
	return (
		<Link to={`/movie/${movie.id}`}>
			<img className="aspect-video object-cover" src={movie.poster} alt={movie.title} />
			<h2
				className="text-lg dark:text-white text-secondary font-semibold"
				title={movie.title}
			>
				{trimTitle(movie.title)}
			</h2>
			{movie.reviews?.ratingAvg ? (
				<p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
					<span>{movie.reviews?.ratingAvg}</span>
					<AiFillStar />
				</p>
			) : (
				<p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
					No Reviews
				</p>
			)}
		</Link>
	);
};

export default MovieList;
