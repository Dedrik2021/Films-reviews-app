import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';

const Dashboard = () => {
	const [showOptions, setShowOptions] = useState(false)

	return (
		<div className="flex items-center justify-between relative">
			<div>
				<label htmlFor="search"></label>
				<input
					type="search"
					id="search"
					className="border-2 p-1 dark:border-light-subtle border-light-subtle dark:focus:border-white focus:border-primary transitio bg-transparent rounded text-lg outline-none"
					placeholder="Search Movies..."
				/>
			</div>

			<button onClick={() => setShowOptions(!showOptions)} className="flex items-center space-x-2 border-secondary hover:border-primary text-secondary hover:opacity-80 transition font-semibold border-2 p-1 rounded text-lg px-2 py-1">
				<span>Create</span>
				<AiOutlinePlus />
			</button>

			<CreateOptions visible={showOptions} />
		</div>
	);
};

const CreateOptions = ({visible}) => {
	if (!visible) return null

	return (
		<div className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg">
			<Option>Add Movie</Option>
			<Option>Add Actor</Option>
		</div>
	);
};

const Option = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="dark:text-white text-secondary hover:opacity-80 transition"
			type="submit"
		>
			{children}
		</button>
	);
};

export default Dashboard;
