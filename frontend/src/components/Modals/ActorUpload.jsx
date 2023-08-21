import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';

const ActorUpload = ({ visible, onClose }) => {
	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm title="Create New Actor" btnTitle="Create" />
		</ModalContainer>
	);
};

export default ActorUpload;
