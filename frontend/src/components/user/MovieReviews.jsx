import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';

import Container from '../Container';
import CustomButtonLink from '../CustomButtonLink';
import { deleteReview, getReviewByMovie } from '../../api/review';
import { useAuth, useNotification } from '../../hooks';
import RatingStar from '../RatingStar';
import ConfirmModal from '../Modals/ConfirmModal';
import NotFoundText from '../NotFoundText';
import EditRatingModal from '../Modals/EditRatingModal';

const getNameInitial = (name = '') => {
	return name[0].toUpperCase();
};

const MovieReviews = () => {
    const [selectedReview, setSelectedReview] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
	const [reviews, setReviews] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [busy, setBusy] = useState(false)
    const [movieTitle, setMovieTitle] = useState('')
	const [profileOwnersReview, setProfileOwnersReview] = useState(null);
	const { movieId } = useParams();
	const { updateNotification } = useNotification();
	const { authInfo } = useAuth();

	const profileId = authInfo.profile?.id;

	const fetchReviews = async () => {
		const { movie, error } = getReviewByMovie(movieId);
		if ( error) return updateNotification('error', error);

		setReviews([...movie.reviews]);
        setMovieTitle(movie.title)
	};

	useEffect(() => {
		if (movieId) fetchReviews();
	}, [movieId]);

	const findProfileOwnersReview = () => {
		if (profileOwnersReview) return setProfileOwnersReview(null);

		const matched = reviews.find((review) => review.owner.id === profileId);
		if (!matched) return updateNotification('error', "You don't have any review!");

		setProfileOwnersReview(matched);
	};

    const displayConfirmModal = () => {
        setShowConfirmModal(true)
    }

    const hideConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const handleDeleteConfirm = async () => {
        setBusy(true)
        const {error, message} = await deleteReview(profileOwnersReview.id)
        setBusy(false)
        if (error) return updateNotification("error", error)
        updateNotification("success", message)
        
        const updateReviews = reviews.filter((r) => r.id !== profileOwnersReview.id)
        setReviews([...updateReviews])
        setProfileOwnersReview(null)
        hideConfirmModal()
    }

    const handleOnEditClick = () => {
        const {id, content, rating} = profileOwnersReview
        setSelectedReview({
            id,
            content,
            rating
        })

        setShowEditModal(true)
    }

	return (
		<div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container className="xl:px-0 px-2 py-8">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold dark:text-white text-secondary">
						<span className="text-light-subtle dark:text-dark-subtle font-normal">
							Reviews for:
						</span>{' '}
						{movieTitle}
					</h1>
					{profileId ? (
						<CustomButtonLink
							label={profileOwnersReview ? 'View All' : 'Find My Review'}
							onClick={findProfileOwnersReview}
						/>
					) : null}
				</div>

                <NotFoundText text="No Reviews!" visible={!reviews.length} />

				{profileOwnersReview ? (
					<div>
						<ReviewCard review={profileOwnersReview} />
						<div className="flex space-x-3 dark:text-white text-primary text-xl p-3 ">
							<button onClick={displayConfirmModal} type="button">
								<BsTrash />
							</button>
							<button onClick={handleOnEditClick} type="button">
								<BsPencilSquare />
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-3 mt-3">
						{reviews.map((review) => {
							return <ReviewCard review={review} key={review.id} />;
						})}
					</div>
				)}
			</Container>

            <ConfirmModal
                visible={showConfirmModal}
                onCancel={hideConfirmModal}
                title="Are You Sure?"
                subtitle="This action will remove this review permanently."
                onConfirm={handleDeleteConfirm}
                busy={busy}
            />

            <EditRatingModal
                visible={showEditModal}
                initialState={selectedReview}
            />
		</div>
	);
};

const ReviewCard = ({ review }) => {
	if (!review) return null;
	const { owner, content, rating } = review;

	return (
		<div className="flex space-x-3 mt-3 ">
			<div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none ">
				{getNameInitial(owner.name)}
			</div>
			<div>
				<h1 className="dark:text-white text-secondary font-semibold text-lg">
					{owner.name}
				</h1>
				<RatingStar rating={rating} />
				<p className="text-light-subtle dark:text-dark-subtle">{content}</p>
			</div>
		</div>
	);
};

export default MovieReviews;
