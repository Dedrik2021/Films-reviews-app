import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentMovie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    content: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Review", reviewSchema)