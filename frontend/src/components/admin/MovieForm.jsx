import { useState } from 'react';

import TagsInput from './TagsInput';
import { commonInputClasses } from '../../utils/theme';
import SubmitBtn from '../form/SubmitBtn';
import { useNotification } from '../../hooks/index';
import WritersModal from '../Modals/WritersModal';
import CastForm from '../form/CastForm';
import CastModal from '../Modals/CastModal';
import PosterSelector from '../PosterSelector';
import GenresSelector from '../GenresSelector';
import GenresModal from '../Modals/GenresModal';
import Selected from '../Selector';
import Label from '../Label';
import DirectorSelector from '../DirectorSelector';
import ViewAllButton from '../ViewAllButton';
import LabelWithBadge from '../LabelWithBage';
import { validateMovie } from '../../utils/validator';

import { typeOptions, statusOptions, languageOptions } from '../../utils/options';
import WritersSelector from '../WritersSelector';

const defaultMuvieInfo = {
	title: '',
	storyLine: '',
	tags: [],
	cast: [],
	director: {},
	writers: [],
	releseDate: '',
	poster: null,
	genres: [],
	type: '',
	language: '',
	status: '',
};

const MovieForm = ({onSubmit, busy}) => {
	const [movieInfo, setMovieInfo] = useState({ ...defaultMuvieInfo });
	const [showWritersModal, setShowWritersModal] = useState(false);
	const [showCastModal, setShowCastModal] = useState(false);
	const [showGenresModal, setShowGenresModal] = useState(false);
	const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

	const { updateNotification } = useNotification();

	const handleSubmit = (e) => {
		e.preventDefault();

		const { error } = validateMovie(movieInfo);
		if (error) return updateNotification('error', error);

		const {tags, genres, writers, cast, director, poster} = movieInfo
		const formData = new FormData()

		const finalMovieInfo = {
			...movieInfo
		}

		finalMovieInfo.tags = JSON.stringify(tags)
		finalMovieInfo.genres = JSON.stringify(genres)

		const finalCast = cast.map((c) => ({
			actor: c.profile.id,
			roleAs: c.roleAs,
			leadActor: c.leadActor
		}))
		finalMovieInfo.cast = JSON.stringify(finalCast)

		if (writers.length) {
			const finalWriters = writers.map(w => w.id)
			finalMovieInfo.writers = JSON.stringify(finalWriters)
		}

		if (director.id) {
			finalMovieInfo.director = director.id
		}

		if (poster) finalMovieInfo.poster = poster

		for (const key in finalMovieInfo) {
			formData.append(key, finalMovieInfo[key])
		}

		onSubmit(formData);
	};

	const updatePosterForUI = (file) => {
		const url = URL.createObjectURL(file);
		setSelectedPosterForUI(url);
	};

	const handleChange = ({ target }) => {
		const { value, name, files } = target;

		if (name === 'poster') {
			const poster = files[0];
			updatePosterForUI(poster);
			return setMovieInfo({ ...movieInfo, poster });
		}
		setMovieInfo({ ...movieInfo, [name]: value });
	};

	const updateTags = (tags) => {
		setMovieInfo({ ...movieInfo, tags });
	};

	const updateDirector = (profile) => {
		setMovieInfo({ ...movieInfo, director: profile });
	};

	const updateWriters = (profile) => {
		const { writers } = movieInfo;
		for (const writer of writers) {
			if (writer.id === profile.id) {
				return updateNotification('warning', 'This profile is already selected!');
			}
		}
		setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
	};

	const hideWritersModal = () => {
		setShowWritersModal(false);
	};

	const displayWritersModal = () => {
		setShowWritersModal(true);
	};

	const handleWriterRemove = (writerId) => {
		const { writers } = movieInfo;
		const newWriters = writers.filter((writer) => writer.id !== writerId);
		if (!newWriters.length) hideWritersModal();
		setMovieInfo({ ...movieInfo, writers: [...newWriters] });
	};

	const updateCast = (castInfo) => {
		const { cast } = movieInfo;
		setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
	};

	const updateGenres = (genres) => {
		setMovieInfo({ ...movieInfo, genres });
	};

	const hideCastModal = () => {
		setShowCastModal(false);
	};

	const displayCastModal = () => {
		setShowCastModal(true);
	};

	const handleCastRemove = (castId) => {
		const { cast } = movieInfo;
		const newCast = cast.filter(({ profile }) => profile.id !== castId);
		if (!newCast.length) hideCastModal();
		setMovieInfo({ ...movieInfo, cast: [...newCast] });
	};

	const hideGenresModal = () => {
		setShowGenresModal(false);
	};

	const displayGenresModal = () => {
		setShowGenresModal(true);
	};

	const { title, storyLine, writers, cast, tags, genres, type, language, status } = movieInfo;

	return (
		<>
			<div className="flex space-x-3">
				<div className="w-[70%] space-y-5">
					<div>
						<Label htmlFor="title">Title</Label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={handleChange}
							name="title"
							className={`${commonInputClasses} border-b-2 font-semibold text-xl p-1`}
							placeholder="Title"
						/>
					</div>
					<div>
						<Label htmlFor="storyLine">Story Line</Label>
						<textarea
							name="storyLine"
							value={storyLine}
							onChange={handleChange}
							id="storyLine"
							className={`${commonInputClasses} resize-none h-24 border-b-2`}
							placeholder="Movie story line"
						></textarea>
					</div>
					<Label htmlFor="tags">Tags</Label>
					<TagsInput value={tags} name="tags" onChange={updateTags} />
					<DirectorSelector onSelect={updateDirector} />

					<div>
						<div className="flex justify-between">
							<LabelWithBadge badge={writers.length} htmlFor="writers">
								Writers
							</LabelWithBadge>
							<ViewAllButton visible={writers.length} onClick={displayWritersModal}>
								View all
							</ViewAllButton>
						</div>
						<WritersSelector onSelect={updateWriters} />
					</div>
					<div>
						<div className="flex justify-between mb-2">
							<LabelWithBadge badge={cast.length}>Add Cast & Crew</LabelWithBadge>
							<ViewAllButton visible={cast.length} onClick={displayCastModal}>
								View all
							</ViewAllButton>
						</div>
						<hr />
						<CastForm onSubmit={updateCast} />
					</div>
					<input
						type="date"
						className={`${commonInputClasses} border-2 rounded p-1 w-auto`}
						name="releseDate"
						onChange={handleChange}
					/>

					<SubmitBtn busy={busy} onClick={handleSubmit} type="button">
						Upload
					</SubmitBtn>
				</div>
				<div className="w-[30%] space-y-5">
					<PosterSelector
						name="poster"
						label="Select Poster"
						selectedPoster={selectedPosterForUI}
						onChange={handleChange}
						accept="image/jpeg, image/jpg, image/png"
					/>
					<GenresSelector badge={genres.length} onClick={displayGenresModal} />
					<Selected
						label="Type"
						options={typeOptions}
						onChange={handleChange}
						name="type"
						value={type}
					/>
					<Selected
						label="Language"
						options={languageOptions}
						onChange={handleChange}
						name="language"
						value={language}
					/>
					<Selected
						label="Status"
						options={statusOptions}
						onChange={handleChange}
						name="status"
						value={status}
					/>
				</div>
			</div>
			<WritersModal
				onClose={hideWritersModal}
				profiles={writers}
				visible={showWritersModal}
				onRemoveClick={handleWriterRemove}
			/>
			<CastModal
				onClose={hideCastModal}
				cast={cast}
				visible={showCastModal}
				onRemoveClick={handleCastRemove}
			/>
			<GenresModal
				visible={showGenresModal}
				onClose={hideGenresModal}
				onSubmit={updateGenres}
				previousSelection={genres}
			/>
		</>
	);
};

export default MovieForm;
