import { commonInputClasses } from '../utils/theme';

const LiveSearch = () => {
	return (
		<div>
			<label htmlFor="search"></label>
			<input type="text" id='search' className={`${commonInputClasses} border-2 rounded p-1 pl-2 pr-2 text-lg`} />
		</div>
	);
};

export default LiveSearch;
