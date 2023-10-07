import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const AppSearchForm = ({ placeholder, onSubmit, showResetIcon }) => {
	const [value, setValue] = useState('');

	const handleOnSubmit = (e) => {
		e.preventDefault();

		onSubmit(value);
	};

	return (
		<form onSubmit={handleOnSubmit} className="relative">
			<label htmlFor="search"></label>
			<input
				type="search"
				id="search"
				className="border-2 p-1 dark:border-light-subtle border-light-subtle dark:focus:border-white focus:border-primary transitio bg-transparent rounded text-lg outline-none"
				placeholder={placeholder}
				value={value}
				onChange={({ target }) => setValue(target.value)}
			/>
			{showResetIcon ? (
				<button
					type="button"
					className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
				>
					<AiOutlineClose />
				</button>
			) : null}
		</form>
	);
};

export default AppSearchForm;
