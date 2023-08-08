import { AiOutlineClose } from 'react-icons/ai';

import ModalContainer from './ModalContainer';

const WritersModal = ({ profiles = [], visible, onClose }) => {
	return (
		<ModalContainer visible={visible} onClose={onClose}>
			<div className="space-y-2">
				{profiles.map(({ id, avatar, name }) => {
					return (
						<div className="flex items-center space-x-3" key={id}>
							<img
								className="w-16 h-16 rounded object-cover"
								src={avatar}
								alt={name}
							/>
							<p className="w-full font-semobold dark:text-white text-primary">{name}</p>
							<button
								type="button"
								className="dark:text-white text-primary hover:opacity-80 transition p-2"
							>
								<AiOutlineClose />
							</button>
						</div>
					);
				})}
			</div>
		</ModalContainer>
	);
};

export default WritersModal;
