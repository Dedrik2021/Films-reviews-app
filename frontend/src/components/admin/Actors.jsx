import { useState, useEffect } from 'react';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';

import { getActors } from '../../api/actor';
import { useNotification } from '../../hooks';

let currentPageNo = 0;
const limit = 20;

const Actors = () => {
	const [actors, setActors] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);

	const { updateNotification } = useNotification();

	const fetchActors = async (pageNo) => {
		const { profiles, error } = await getActors(pageNo, limit);
		if (error) return updateNotification('error', error);

		if (!profiles.length) {
			currentPageNo = pageNo - 1
			return setReachedToEnd(true)
		}

		setActors([...profiles]);
	};

	useEffect(() => {
		fetchActors(currentPageNo);
	}, []);

	const handleOnNextClick = () => {
		if (reachedToEnd) return
		currentPageNo += 1
		fetchActors(currentPageNo)
	}

	const handleOnPrevClick = () => {
		if (currentPageNo <= 0) return
		currentPageNo -= 1
		fetchActors(currentPageNo)
	}

	// <ActorProfile profile={{
	// 	name: "Jhon Doe",
	// 	avatar: "https://img.freepik.com/premium-photo/life-style-tehnology-travel-concept-bearded-man-wearing-white-tshirt-with-digital-camera-isolated-white-background_118342-60744.jpg?w=360",
	// 	about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque voluptate quas veritatis enim debitis! Quisquam repellat temporibus explicabo quia? Porro, accusamus? Ab, consequuntur. Accusamus dolorum quae expedita eius velit nisi?"
	// }} />

	return (
		<div className="p-5">
			<div className="grid grid-cols-4 gap-5">
				{actors.map((actor) => {
					return <ActorProfile profile={actor} key={actor.id} />;
				})}
			</div>
			<div className="flex justify-end items-center space-x-3 mt-5">
				<button className='text-primary dark:text-white hover:underline translate' type='button' onClick={handleOnPrevClick}>Prev</button>
				<button className='text-primary dark:text-white hover:underline translate' type='button' onClick={handleOnNextClick}>Next</button>
			</div>
		</div>
	);
};

const ActorProfile = ({ profile }) => {
	const [showOptions, setShowOptions] = useState(false);

	const handleOnMouseEnter = () => {
		setShowOptions(true);
	};

	const handleOnMouseLeave = () => {
		setShowOptions(false);
	};

	if (!profile) return null;
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
					<h2 className="text-xl text-primary dark:text-white font-semibold">{name}</h2>
					<p className="text-primary dark:text-white">{about.substring(0, 50)}</p>
				</div>
				<Options visible={showOptions} />
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
