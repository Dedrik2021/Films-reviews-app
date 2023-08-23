import { useState } from 'react';

import { commonInputClasses } from '../../utils/theme';
import PosterSelector from '../PosterSelector';
import Selector from '../Selector';

const defaultActorInfo = {
	name: '',
	about: '',
	avatar: null,
	gender: '',
};

const genderOptions = [
	{ title: 'Male', value: 'male' },
	{ title: 'Female', value: 'female' },
	{ title: 'Other', value: 'other' },
];

const ActorForm = ({ title, btnTitle }) => {
	const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
	const [selectedAvatarForUI, setSelectedAvatarForUI] = useState('');

	const { name, about, gender } = actorInfo;

	const updatePosterForUI = (file) => {
		const url = URL.createObjectURL(file);
		setSelectedAvatarForUI(url);
	};

	const handleChange = ({ target }) => {
		const { value, files, name } = target;
		if (name === 'avatar') {
			const file = files[0];
			updatePosterForUI(file);
			return setActorInfo({ ...actorInfo, avatar: file });
		}

		setActorInfo({ ...actorInfo, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(actorInfo);
	};

	return (
		<form className="dark:bg-primary bg-white p-3 w-[35rem] rounded" onSubmit={handleSubmit}>
			<div className="flex justify-between items-center mb-3">
				<h1 className="font-semibold text-xl dark:text-white text-primary">{title}</h1>
				<button
					type="submit"
					className="px-3 py-3 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded"
				>
					{btnTitle}
				</button>
			</div>
			<div className="flex space-x-2">
				<PosterSelector
					name="avatar"
					onChange={handleChange}
					accept="image/jpeg, image/jpg, image/png"
					label="Select Avatar"
					selectedPoster={selectedAvatarForUI}
					className="w-36 h-36 aspect-square object-cover"
				/>
				<div className="flex-grow flex flex-col space-y-2">
					<input
						type="text"
						className={`${commonInputClasses} border-b-2`}
						placeholder="Enter Name..."
						name="name"
						onChange={handleChange}
						value={name}
					/>
					<textarea
						placeholder="About"
						className={`${commonInputClasses} border-b-2 resize-none h-full`}
						name="about"
						onChange={handleChange}
						value={about}
					></textarea>
				</div>
			</div>
			<div className="mt-3">
				<Selector
					options={genderOptions}
					label="Gender"
					value={gender}
					onChange={handleChange}
					name="gender"
				/>
			</div>
		</form>
	);
};

export default ActorForm;
