import { useState, useEffect } from 'react';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';

import { getActors, searchActor } from '../../api/actor';
import { useNotification } from '../../hooks';
import NextAndPrevBtns from '../NextAndPrevBtns';
import UpdateActor from '../Modals/UpdateActor';
import AppSearchForm from '../form/AppSearchForm';
import { useSearch } from '../../hooks';

let currentPageNo = 0;
const limit = 20;

const Actors = () => {
	const [actors, setActors] = useState([]);
	const [results, setResults] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);

	const { updateNotification } = useNotification();
	const { handleSearch } = useSearch();

	const fetchActors = async (pageNo) => {
		const { profiles, error } = await getActors(pageNo, limit);
		if (error) return updateNotification('error', error);

		if (!profiles.length) {
			currentPageNo = pageNo - 1;
			return setReachedToEnd(true);
		}

		setActors([...profiles]);
	};

	useEffect(() => {
		fetchActors(currentPageNo);
	}, []);

	const handleOnNextClick = () => {
		if (reachedToEnd) return;
		currentPageNo += 1;
		fetchActors(currentPageNo);
	};

	const handleOnPrevClick = () => {
		if (currentPageNo <= 0) return;
		if (reachedToEnd) setReachedToEnd(false);
		currentPageNo -= 1;
		fetchActors(currentPageNo);
	};

	const handleOnEditClick = (actor) => {
		setShowUpdateModal(true);
		setSelectedProfile(actor);
	};

	const hideUpdateModal = () => {
		setShowUpdateModal(false);
	};

	const handleOnActorUpdate = (profile) => {
		const updatedActors = actors.map((actor) => {
			if (profile.id === actor.id) {
				return profile;
			}

			return actor;
		});

		setActors([...updatedActors]);
	};

	const handleOnSubmit = (value) => {
		handleSearch(searchActor, value, setResults);
	};

	return (
		<>
			<div className="p-5">
				<div className="flex justify-end mb-5">
					<AppSearchForm showResetIcon={results.length} placeholder="Search Actors..." onSubmit={handleOnSubmit} />
				</div>
				<div className="grid grid-cols-4 gap-5">
					{results.length
						? results.map((actor) => {
								return (
									<ActorProfile
										profile={actor}
										key={actor.id}
										onEditClick={() => handleOnEditClick(actor)}
									/>
								);
						})
						: actors.map((actor) => {
								return (
									<ActorProfile
										profile={actor}
										key={actor.id}
										onEditClick={() => handleOnEditClick(actor)}
									/>
								);
						})}
				</div>
				{!results.length ? (
					<NextAndPrevBtns
						onNextClick={handleOnNextClick}
						onPrevClick={handleOnPrevClick}
						className="mt-5"
					/>
				) : null}
			</div>
			<UpdateActor
				visible={showUpdateModal}
				onClose={hideUpdateModal}
				initialState={selectedProfile}
				onSuccess={handleOnActorUpdate}
			/>
		</>
	);
};

const ActorProfile = ({ profile, onEditClick }) => {
	const [showOptions, setShowOptions] = useState(false);
	const acceptNameLength = 15;

	const handleOnMouseEnter = () => {
		setShowOptions(true);
	};

	const handleOnMouseLeave = () => {
		setShowOptions(false);
	};

	if (!profile) return null;

	const getName = (name) => {
		if (name.length <= acceptNameLength) return;

		return name.substring(0, acceptNameLength) + '...';
	};

	const { avatar, name, about = '' } = profile;

	return (
		<div className="bg-white shadow dark:shadow dark:bg-secondary rounded overflow-hidden">
			<div
				className="flex cursor-pointer h-20 relative"
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
			>
				<img className="w-20 object-cover aspect-square" src={avatar} alt={name} />

				<div className="px-2">
					<h2 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
						{getName(name)}
					</h2>
					<p className="text-primary dark:text-white opacity-70">
						{about.substring(0, 50)}
					</p>
				</div>
				<Options onEditClick={onEditClick} visible={showOptions} />
			</div>
		</div>
	);
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
	if (!visible) return null;

	return (
		<div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
			<button
				className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
				type="button"
				onClick={onDeleteClick}
			>
				<BsTrash />
			</button>
			<button
				onClick={onEditClick}
				className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
				type="button"
			>
				<BsPencilSquare />
			</button>
		</div>
	);
};

export default Actors;
