import { useState } from 'react';

import LiveSearch from '../LiveSearch';
import { commonInputClasses } from '../../utils/theme';
import { results } from '../admin/MovieForm';
import { renderItem } from '../admin/MovieForm';
import { useNotification } from '../../hooks';

// const cast = [{actor: 3, roles: "", leadActor: true}]
const defaultCastInfo = {
	profile: {},
	roleAs: '',
	leadActor: false,
};

const CastForm = ({onSubmit}) => {
	const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
	const { leadActor, profile, roleAs } = castInfo;

    const {updateNotification} = useNotification()

    const handleOnChange = ({target}) => {
        const {value, name, checked} = target
        if (name === "leadActor") return setCastInfo({...castInfo, leadActor: checked})
        setCastInfo({...castInfo, [name]: value})
    }

    const handleProfileSelect = (profile) => {
        setCastInfo({...castInfo, profile})
    }

    const handleSubmit = () => {
        const { profile, roleAs } = castInfo;
        if (!profile.name) return updateNotification('error', "Cast profile is missing!")
        if (!roleAs.trim()) return updateNotification('error', "Cast role is missing!")

        onSubmit(castInfo)
        setCastInfo({...defaultCastInfo})
    }

	return (
		<div className="flex  flex-col space-x-2">
			<div className="flex items-center space-x-2 mb-1">
				<label
					className="dark:text-dark-subtle text-light-subtle"
					htmlFor="lead-actor"
				>
					Lead Actor
				</label>
				<input
					type="checkbox"
					id="lead-actor"
					name="leadActor"
					className="w-4 h-4"
					checked={leadActor}
                    onChange={handleOnChange}
                    title='Set as lead actor'
				/>
			</div>
			<div className="flex items-center space-x-2">
				<LiveSearch placeholder="Search Profile..." value={profile.name} results={results} onSelect={handleProfileSelect} renderItem={renderItem} />
				<span className="dark:text-dark-subtle text-light-subtle font-semibold">as</span>

				<div className="flex-grow">
					<label
						htmlFor="role"
						className="dark:text-dark-subtle text-light-subtle font-semibold"
					></label>
					<input
						id="role"
						type="text"
						className={`${commonInputClasses} rounded p-1 text-lg border-2`}
						placeholder="Role as"
                        name='roleAs'
                        value={roleAs}
                        onChange={handleOnChange}
					/>
				</div>

				<button
					type="button"
                    onClick={handleSubmit}
					className="dark:bg-white dark:text-primary text-white bg-secondary p-1 rounded"
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default CastForm;
