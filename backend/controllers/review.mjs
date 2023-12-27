import { isValidObjectId } from "mongoose"

import { sendError } from "../utils/helper.mjs"
import Movie from '../models/movie.mjs'
import Review from '../models/review.mjs'

const addReview = async (req, res, next) => {
    const {movieId} = req.params
    const {content, rating} = req.body
    const userId = req.user._id
    let movie, isAlreadyReview
    
    if (isValidObjectId(movieId)) return sendError(res, 'Invalid movie!')

    try {
        movie = await Movie.findOne({_id: movieId, status: "public"})
    } catch(err) {
        return next(sendError(req, "Movie not found!", 404))
    }

    if (!movie) return sendError(req, "Movie not found!", 404)

    try {
        isAlreadyReview = await Review.findOne({
            owner: userId,
            parentMovie: movie._id
        })
    } catch(err) {
        return next(sendError(res, "Something went wrong!"))
    }

    if (isAlreadyReview) return sendError(req, "Invalid request, review is already their!")


    const newReview = new Review({
        owner: userId,
        parentMovie: movie._id,
        content,
        rating
    })

    movie.reviews.push(newReview._id)

    try {
        await movie.save()
    } catch(err) {
        return next(sendError(res, 'Movie not has been sended.'))
    }

    try {
        await newReview.save()
    } catch(err) {
        return next(sendError(res, 'Review not has been saved.'))
    }
}

export {addReview}