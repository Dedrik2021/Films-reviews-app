import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

import ModalContainer from './ModalContainer';

const CastModal = ({ cast = [], visible, onClose, onRemoveClick }) => {
	return (
		<ModalContainer ignoreContainer visible={visible} onClose={onClose}>
			<div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
				{cast.map(({ profile, roleAs, leadActor }) => {
					const { id, name, avatar } = profile;

					return (
						<div className=" flex space-x-3 bg-white dark:bg-secondary drop-shadow-md rounded" key={id}>
							<img
								className="w-16 h-16 aspect-square rounded object-cover"
								src={avatar}
								alt={name}
							/>
							<div className=" w-full flex flex-col justify-between">
								<div>
									<p className=" font-semobold dark:text-white text-primary">
										{name}
									</p>
									<p className="text-sm dark:text-dark-subtle text-light-subtle">
										{roleAs}
									</p>
								</div>
								{leadActor && <AiOutlineCheck className='text-light-subtle dark:text-dark-subtle' />}
							</div>
							<button
								type="button"
								onClick={() => onRemoveClick(id)}
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

export default CastModal;
