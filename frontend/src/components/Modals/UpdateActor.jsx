import { useState } from 'react';

import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { updateActor } from '../../api/actor';
import { useNotification } from '../../hooks';

const UpdateActor = ({ visible, onClose, initialState, onSuccess }) => {
	const { updateNotification } = useNotification();
	const [busy, setBusy] = useState(false);

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, actor } = await updateActor(initialState.id, data);
		setBusy(false);
		if (error) return updateNotification('error', error);

        onSuccess(actor)
		updateNotification('success', 'Actor updated successfully!');
		onClose();
	};

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm
				onSubmit={!busy ? handleSubmit : null}
				busy={busy}
				title="Update Actor"
				btnTitle="Update"
                initialState={initialState}
			/>
		</ModalContainer>
	);
};

export default UpdateActor;