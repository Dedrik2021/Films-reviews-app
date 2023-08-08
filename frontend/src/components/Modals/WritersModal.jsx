import { AiOutlineClose } from 'react-icons/ai';

import ModalContainer from './ModalContainer';

const WritersModal = ({ profiles = [], visible, onClose }) => {
	return (
		<ModalContainer ignoreContainer visible={visible} onClose={onClose}>
			<div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
				{profiles.map(({ id, avatar, name }) => {
					return (
						<div className="flex space-x-3" key={id}>
							<img
								className="w-16 h-16 aspect-square rounded object-cover"
								src={avatar}
								alt={name}
							/>
							<p className="w-full font-semobold dark:text-white text-primary">
								{name}
							</p>
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
