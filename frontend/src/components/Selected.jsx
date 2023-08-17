const Selected = ({ name, label, value, onChange }) => {
	return (
		<select
			name={name}
			id={name}
			value={value}
			onChange={onChange}
			className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1 pr-10 outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary cursor-pointer"
		>
			<option value="">{label}</option>
		</select>
	);
};

export default Selected;
