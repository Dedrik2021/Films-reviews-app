const Selected = ({ name, label, options, value, onChange }) => {
	return (
		<select
			name={name}
			id={name}
			value={value}
			onChange={onChange}
			className="border-2 dark:border-dark-subtle bg-white border-light-subtle dark:focus:border-white focus:border-primary p-1 pr-10 outline-none dark:bg-primary transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary cursor-pointer"
		>
			<option value="">{label}</option>
			{options.map(({ title, value }) => {
				return (
					<option key={title} value={value}>
						{title}
					</option>
				);
			})}
		</select>
	);
};

export default Selected;
