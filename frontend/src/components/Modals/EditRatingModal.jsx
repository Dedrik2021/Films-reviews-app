import { useParams } from 'react-router-dom';

import ModalContainer from './ModalContainer';
import RatingForm from '../form/RatingForm';
import { useNotification } from '../../hooks';

const EditRatingModal = ({visible, onClose, initialState, onSuccess}) => {
	const {movieId} = useParams()
	const {updateNotification} = useNotification()

    const handleSubmit = async (data) => {
		
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<RatingForm initialState={initialState} onSubmit={handleSubmit} />
		</ModalContainer>
	);
};

export default EditRatingModal;
