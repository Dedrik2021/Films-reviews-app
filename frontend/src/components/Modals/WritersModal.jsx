import ModalContainer from './ModalContainer';

const WritersModal = ({profiles = [], visible, onClose}) => {
	return (
		<ModalContainer visible={visible} onClose={onClose}>
			{profiles.map(({ id, avatar, name }) => {
				return (
					<div className="flex" key={id}>
						<img src={avatar} alt={name} />
						<p>{name}</p>
					</div>
				);
			})}
		</ModalContainer>
	);
};

export default WritersModal;
