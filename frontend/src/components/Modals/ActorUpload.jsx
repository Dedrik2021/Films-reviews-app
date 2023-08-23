import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';

const ActorUpload = ({ visible, onClose }) => {

    const handleSubmit = (data) => {
        console.log(data);
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm onSubmit={handleSubmit} title="Create New Actor" btnTitle="Create" />
		</ModalContainer>
	);
};

export default ActorUpload;
