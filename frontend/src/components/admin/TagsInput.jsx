const TagsInput = () => {
	return (
		<div>
			<div className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center space-x-2">
				<span>Tag One</span>
				<span>Tag Two</span>
				<span>Tag Tree</span>
				<input
					type="text"
					className="h-full w-full flex-grow bg-transparent outline-none dark:text-white"
				/>
			</div>
		</div>
	);
};

export default TagsInput;
