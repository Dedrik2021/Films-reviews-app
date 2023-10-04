import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { useTheme } from '../../hooks';

const Header = ({onAddActorClick, onAddMovieClick}) => {
	const [showOptions, setShowOptions] = useState(false);
    const {toggleTheme} = useTheme()

    const options = [
        {title: "Add Movie", onClick: onAddMovieClick},
        {title: "Add Actor", onClick: onAddActorClick},
    ]

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

			<div className="flex items-center space-x-5">
            <button type='button' onClick={toggleTheme} className='dark:text-white text-light-subtle'>
                <BsFillSunFill size={24}/>
            </button>
				<button
                    type='button'
					onClick={() => setShowOptions(!showOptions)}
					className="flex items-center space-x-2 dark:border-dark-subtle dark:text-dark-subtle border-light-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 p-1 rounded text-lg px-2 py-1"
				>
					<span>Create</span>
					<AiOutlinePlus />
				</button>

				<CreateOptions visible={showOptions} options={options} onClose={() => setShowOptions(false)} />
			</div>
		</div>
	);
};

const CreateOptions = ({ visible, options, onClose }) => {
	const handleClick = (fn) => {
		fn()
		onClose()
	}

	if (!visible) return null;

	return (
		<div className="absolute right-0 top-12 flex z-50 flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg animate-scale">
            {options.map(({title, onClick}) => {
                return <Option key={title} onClick={() => handleClick(onClick)}>{title}</Option>
            })}
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

export default Header;
