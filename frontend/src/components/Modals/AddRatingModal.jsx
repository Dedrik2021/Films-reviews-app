import ModalContainer from './ModalContainer';
import RatingForm from '../form/RatingForm';

const AddRatingModal = ({visible, onClose}) => {
    const handleSubmit = (data) => {

    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<RatingForm onSubmit={handleSubmit} />
		</ModalContainer>
	);
};

export default AddRatingModal;
