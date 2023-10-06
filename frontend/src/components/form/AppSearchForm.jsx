const AppSearchForm = ({placeholder}) => {
	return (
		<form>
			<label htmlFor="search"></label>
			<input
				type="search"
				id="search"
				className="border-2 p-1 dark:border-light-subtle border-light-subtle dark:focus:border-white focus:border-primary transitio bg-transparent rounded text-lg outline-none"
				placeholder={placeholder}
			/>
		</form>
	);
};

export default AppSearchForm;
