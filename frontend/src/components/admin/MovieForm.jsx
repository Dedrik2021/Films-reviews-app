const MovieForm = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className="flex space-x-3">
			<div className="w-[70%] h-5">
				<label htmlFor="tile" className="dark:text-dark-subtle text-light-subtle font-semibold">Title</label>
				<input
					id="title"
					type="text"
					className="w-full bg-transparent outline-none border-b-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition dark:text-white text-primary font-semibold text-xl p-1"
                    placeholder="Title"
				/>
			</div>
			<div className="w-[30%] h-5 bg-blue-400"></div>
		</form>
	);
};

export default MovieForm;
