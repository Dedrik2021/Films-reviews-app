import { useState } from 'react';

import { genres } from '../../utils/genres';
import ModalContainer from './ModalContainer';

const GenresModal = ({ visible, onClose }) => {
	const [selectedGenres, setSelectedGenres] = useState([]);

	const handleGenresSelector = (genr) => {
		let newGenres = [];

		if (selectedGenres.includes(genr)) {
			newGenres = selectedGenres.filter((gen) => gen !== genr);
		} else newGenres = [...selectedGenres, genr];

		setSelectedGenres([...newGenres]);
	};

	return (
		<ModalContainer visible={visible} onClose={onClose}>
			<h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
				Select Genres
			</h1>

			<div className="space-y-3">
				{genres.map((genr, i) => {
					return (
						<Genre
							onClick={() => handleGenresSelector(genr)}
							key={i}
							selected={selectedGenres.includes(genr)}
						>
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
			? 'dark:bg-white dark:text-primary bg-light-subtle text-white p-1 mr-3'
			: 'text-black dark:text-white border-2 border-light-subtle dark:border-dark-subtle p-1 mr-3';
	};

	return (
		<button
			onClick={onClick}
			className={
				getSelectedStyle() +
				'p-1 rounded mr-3'
			}
			type="button"
		>
			{children}
		</button>
	);
};

export default GenresModal;
