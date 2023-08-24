import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { createActor } from '../../api/actor';
import { useNotification } from '../../hooks';

const ActorUpload = ({ visible, onClose }) => {
    const {updateNotification} = useNotification()

    const handleSubmit = async (data) => {
        const {error, actor} = await createActor(data);
        if (error) return updateNotification('error', error)
        updateNotification('success', 'Actor created successfully!')
        onClose()
    }

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm onSubmit={handleSubmit} title="Create New Actor" btnTitle="Create" />
		</ModalContainer>
	);
};

export default ActorUpload;
