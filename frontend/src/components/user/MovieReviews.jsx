import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "../Container"
import CustomButtonLink from "../CustomButtonLink";
import { getReviewByMovie } from "../../api/review";
import { useNotification } from "../../hooks";

const getNameInitial = (name = "") => {
    return name[0].toUpperCase()
}

const MovieReviews = () => {
    const [reviews, setReviews] = useState([])
    const {movieId} = useParams()
    const {updateNotification} = useNotification()

    const fetchReviews = async () => {
        const {reviews, error} = getReviewByMovie(movieId)
        if (error) return updateNotification('error', error)

        setReviews([...reviews])
    }

    useEffect(() => {
        if (movieId) fetchReviews()
    }, [movieId])

    return ( 
        <div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container className="xl:px-0 px-2 py-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold dark:text-white text-secondary">
                        <span className="text-light-subtle dark:text-dark-subtle font-normal">
                            Reviews for:
                        </span>{" "}
                        This is the title
                    </h1>
                    <CustomButtonLink label={"Find My Review"} />
                </div>
                <div className="space-y-3">
                    {reviews.map((review) => {
                        return <ReviewCard review={review} key={review.id} />
                    })}
                </div>
            </Container>
        </div>
    );
}

const ReviewCard = ({review}) => {
    const {owner, content, rating} = review

    return (
        <div className="flex space-x-3 mt-3 ">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none ">
                {getNameInitial(owner.name)}
            </div>
        </div>
    )
}

export default MovieReviews;