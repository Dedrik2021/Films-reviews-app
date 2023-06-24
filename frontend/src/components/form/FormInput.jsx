const FormInput = ({ labelName, placeholder, name, ...rest }) => {
	return (
		<div className="flex flex-col-reverse">
			<input
				type="text"
				name={name}
				className="outline-none bg-transparent rounded border-2 dark:border-dark-subtle dark:focus:border-white focus:border-primary border-light-subtle w-full text-lg pt-1 pr-2 pb-1 pl-2 dark:text-white peer transition"
				placeholder={placeholder}
				id={name}
				{...rest}
			/>
			<label
				className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white transition self-start peer-focus:text-primary "
				htmlFor={name}
			>
				{labelName}
			</label>
		</div>
	);
};

export default FormInput;
