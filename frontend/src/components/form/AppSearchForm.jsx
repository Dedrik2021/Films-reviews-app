import { useState } from "react";

const AppSearchForm = ({placeholder, onSubmit}) => {
	const [value, setValue] = useState('')

	const handleOnSubmit = (e) => {
		e.preventDefault();
		
		onSubmit(value)
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<label htmlFor="search"></label>
			<input
				type="search"
				id="search"
				className="border-2 p-1 dark:border-light-subtle border-light-subtle dark:focus:border-white focus:border-primary transitio bg-transparent rounded text-lg outline-none"
				placeholder={placeholder}
				value={value}
				onChange={({target}) => setValue(target.value)}
			/>
		</form>
	);
};

export default AppSearchForm;
