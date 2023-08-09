import { useState } from 'react';

import LiveSearch from '../LiveSearch';
import { commonInputClasses } from '../../utils/theme';

// const cast = [{actor: 3, roles: "", leadActor: true}]
const defaultCastInfo = {
	profile: {},
	roles: '',
	leadActor: false,
};

const CastForm = () => {
	const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
	const { leadActor } = castInfo;

	return (
		<div className="flex  flex-col space-x-2">
			<div className="flex items-center space-x-2 mb-1">
				<label
					className="dark:text-dark-subtle text-light-subtle font-semibold"
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
				/>
			</div>
			<div className="flex items-center space-x-2">
				<LiveSearch placeholder="Search Profile..." />
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
					/>
				</div>

				<button
					type="button"
					className="dark:bg-white dark:text-primary text-white bg-secondary p-1 rounded"
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default CastForm;
