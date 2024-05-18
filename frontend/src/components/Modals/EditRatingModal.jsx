import ModalContainer from './ModalContainer';
import RatingForm from '../form/RatingForm';
import { useNotification } from '../../hooks';
import { updateReview } from '../../api/review';

const EditRatingModal = ({visible, onClose, initialState, onSuccess}) => {
	const {updateNotification} = useNotification()

    const handleSubmit = async (data) => {
		const {error, message} = await updateReview(initialState.id, data)
		if (error) return updateNotification('error', error)
		
		onSuccess({...data})
		updateNotification('success', message)
		onClose()
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<RatingForm initialState={initialState} onSubmit={handleSubmit} />
		</ModalContainer>
	);
};

export default EditRatingModal;
