import { genres } from '../../utils/genres';
import ModalContainer from './ModalContainer';

const GenresModal = ({ visible, onClose }) => {
	return (
		<ModalContainer visible={visible} onClose={onClose}>
			<h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
				Select Genres
			</h1>

			<div className="space-y-3">
				{genres.map((genr, i) => {
					return (
						<Genre key={i} selected={i === 5}>
							{genr}
						</Genre>
					);
				})}
			</div>
		</ModalContainer>
	);
};

const Genre = ({ children, selected, onClick }) => {
	const getSelectedStyle = () => {
		return selected
			? 'dark:bg-white dark:text-black bg-light-subtle text-white'
			: '';
	};

	return (
		<button
			onClick={onClick}
			className={
				getSelectedStyle() +
				'border-2 dark:border-dark-subtle border-light-subtle p-1 rounded mr-3 text-primary dark:text-white'
			}
			type="button"
		>
			{children}
		</button>
	);
};

export default GenresModal;
