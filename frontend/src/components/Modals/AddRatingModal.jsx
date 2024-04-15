import ModalContainer from './ModalContainer';
import RatingForm from '../form/RatingForm';

const AddRatingModal = () => {
    const handleSubmit = (data) => {

    }

	return (
		<ModalContainer visible ignoreContainer>
			<RatingForm onSubmit={handleSubmit} />
		</ModalContainer>
	);
};

export default AddRatingModal;
