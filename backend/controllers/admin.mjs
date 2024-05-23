import Movie from '../models/movie.mjs'
import Review from '../models/review.mjs'
import User from '../models/user.mjs'
import { topRatedMoviesPipeline } from '../utils/helper.mjs'

export const getAppInfo = async (req, res) => {
    const movieCount = await Movie.countDocuments()
    const reviewCount = await Review.countDocuments()
    const userCount = await User.countDocuments()

    res.json({appInfo: {movieCount, reviewCount, userCount}})
}

export const getMostRated = async (req, res) => {
	let movies;

	try {
		movies = await Movie.aggregate(topRatedMoviesPipeline(type));
	} catch (err) {
		return next(sendError(res, 'Something went wrong, movies has been not found!'));
	}

	const mapMovies = async (m) => {
		const reviews = await getAverageRatings(m._id)

		return {
			id: m._id,
			title: m.title,
			reviews: {...reviews}
		}
	}

	const topRatedMovies = await Promise.all(movies.map(mapMovies))

	res.json({movies: topRatedMovies})
}