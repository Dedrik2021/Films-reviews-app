import { useState } from 'react';

import { commonInputClasses } from '../../utils/theme';
import PosterSelector from '../PosterSelector';

const defaultActorInfo = {
    name: "",
    about: "",
    avatar: null
}

const ActorForm = ({ title, btnTitle }) => {
    const [actorInfo, setActorInfo] = useState({...defaultActorInfo})
    const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("")

    const {name, about} = actorInfo

    const updatePosterForUI = (file) => {
		const url = URL.createObjectURL(file);
		setSelectedAvatarForUI(url);
	};

    const handleChange = ({target}) => {
        const {value, files, name} = target
        if (name === "avatar") {
            const file = files[0]
            updatePosterForUI(file)
            return setActorInfo({...actorInfo, avatar: file})
        }

        setActorInfo({...actorInfo, [name]: value})
    }

	return (
		<div className="dark:bg-primary bg-white p-3 w-[35rem] rounded">
			<div className="flex justify-between items-center mb-3">
				<h1 className="font-semibold text-xl dark:text-white text-primary">{title}</h1>
				<button
					type="submit"
					className="px-3 py-3 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded"
				>
					{btnTitle}
				</button>
			</div>
			<form className="flex space-x-2">
				
                <PosterSelector name="avatar" onChange={handleChange} selectedPoster={selectedAvatarForUI} className="w-36 h-36 aspect-square object-cover"/>
				<div className="flex-grow flex flex-col space-y-2">
					<input
						type="text"
						className={`${commonInputClasses} border-b-2`}
						placeholder="Enter Name..."
                        name="name" onChange={handleChange}
                        value={name}
					/>
					<textarea
						placeholder="About"
						className={`${commonInputClasses} border-b-2 resize-none h-full`}
                        name="about" onChange={handleChange}
                        value={about}
					></textarea>
				</div>
			</form>
		</div>
	);
};

export default ActorForm;
