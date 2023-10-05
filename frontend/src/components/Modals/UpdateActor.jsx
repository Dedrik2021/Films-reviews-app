import { useState } from 'react';

import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { createActor } from '../../api/actor';
import { useNotification } from '../../hooks';

const UpdateActor = ({ visible, onClose }) => {
	const { updateNotification } = useNotification();
	const [busy, setBusy] = useState(false);

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, actor } = await createActor(data);
		setBusy(false);
		if (error) return updateNotification('error', error);
		updateNotification('success', 'Actor created successfully!');
		onClose();
	};

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm
				onSubmit={!busy ? handleSubmit : null}
				busy={busy}
				title="Update Actor"
				btnTitle="Update"
			/>
		</ModalContainer>
	);
};

export default UpdateActor;