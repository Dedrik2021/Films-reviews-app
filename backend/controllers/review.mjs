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

    res.json({message: "Your review has been added!"})
}

const updateReview = async (req, res, next) => {
    const {reviewId} = req.params
    const {content, rating} = req.body
    const userId = req.user._id
    let review
    
    if (isValidObjectId(reviewId)) return sendError(res, 'Invalid review ID!')

    try {
        review = await Review.findOne({_id: reviewId, owner: userId})
    } catch(err) {
        return next(sendError(req, "Review not found!", 404))
    }

    if (!review) return sendError(req, "Review not found!", 404)

    review.content = content
    review.rating = rating

    try {
        await review.save()
    } catch(err) {
        return next(sendError(res, 'Review not has been saved.'))
    }

    res.json({message: "Your review has been updated!"})
}

const removeReview = async (req, res, next) => {
    const reviewId = req.params
    const userId = req.user._id
    let review, movie
    if (!isValidObjectId(reviewId)) return sendError(res, 'Invalid review ID!')

    try {
        review = await Review.findOne({owner: userId, _id: reviewId})
    } catch(err) {
        return next(sendError(res, "Invalid request!"))
    }

    if (!review) return sendError(res, "Review not found!", 404)

    try {
        movie = await Movie.findById(review.parentMovie).select("reviews")
    } catch(err) {
        return next(sendError(res, "Invalid request!"))
    }

    movie.reviews = movie.reviews.filter(rId => rId.toString() !== reviewId)

    try {
        await Review.findByIdAndDelete(reviewId)
    } catch(err) {
        return next(sendError(res, "Review has not been removed!"))
    }

    try {
        await movie.save()
    } catch(err) {
        return next(sendError(res, "Movie has not been saved!"))
    }

    res.json({message: "Review removed successfully!"})
}

const getReviewsByMovie = async (req, res, next) => {
    const {movieId} = req.params
    let movie

    if (!isValidObjectId(movieId)) return sendError(res, 'Invalid movie ID!')

    try {
        movie = await Movie.findById(movieId).populate({
            path: 'reviews',
            populate: {
                path: 'owner',
                select: 'name'
            }
        }).select('reviews')
    } catch(err) {
        return next(sendError(res, 'Something went wrong!'))
    }

    res.json(movie.reviews)
}

export {addReview, updateReview, removeReview, getReviewsByMovie}