import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { createActor } from '../../api/actor';

const ActorUpload = ({ visible, onClose }) => {

    const handleSubmit = (data) => {
        createActor(data);
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm onSubmit={handleSubmit} title="Create New Actor" btnTitle="Create" />
		</ModalContainer>
	);
};

export default ActorUpload;
