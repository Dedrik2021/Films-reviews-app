import { commonInputClasses } from '../utils/theme';

const LiveSearch = () => {
	return (
		<div className='relative'>
			<label htmlFor="search"></label>
			<input type="text" id='search' className={`${commonInputClasses} border-2 rounded p-1 pl-2 pr-2 text-lg`} 
            placeholder='Search profile'
            />
            <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 overflow-auto space-y-2 mt-1">
                <p>Hello</p>
                <p>World</p>
                <p>How</p>
                <p>Are</p>
                <p>You</p>
            </div>
		</div>
	);
};

export default LiveSearch;
