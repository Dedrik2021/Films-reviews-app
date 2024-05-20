import Movie from '../models/movie.mjs'
import Review from '../models/review.mjs'
import User from '../models/user.mjs'

export const getAppInfo = async (req, res) => {
    const movieCount = await Movie.countDocuments()
    const reviewCount = await Review.countDocuments()
    const userCount = await User.countDocuments()

    res.json({movieCount, reviewCount, userCount})
}

