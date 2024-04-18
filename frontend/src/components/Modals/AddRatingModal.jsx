import { useParams } from 'react-router-dom';

import ModalContainer from './ModalContainer';
import RatingForm from '../form/RatingForm';
import { addReview } from '../../api/review';
import { useNotification } from '../../hooks';

const AddRatingModal = ({visible, onClose}) => {
	const {movieId} = useParams()
	const {updateNotification} = useNotification()

    const handleSubmit = async (data) => {
		const {error, message} = await addReview(movieId, data)
		if (error) return updateNotification("error", error)

		updateNotification("success", message)
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<RatingForm onSubmit={handleSubmit} />
		</ModalContainer>
	);
};

export default AddRatingModal;
