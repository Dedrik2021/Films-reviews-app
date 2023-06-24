const FormInput = ({labelName, placeholder, name, ...rest}) => {
	return (
		<div className="flex flex-col-reverse">
			<input
				type="text"
                name={name}
				className="outline-none bg-transparent rounded border-2 border-dark-subtle focus:border-white w-full text-lg pt-1 pr-2 pb-1 pl-2 text-white peer transition" 
				placeholder={placeholder}
				id={name}
                {...rest}
			/>
			<label
				className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
				htmlFor={name}
			>
				{labelName}
			</label>
		</div>
	);
};

export default FormInput;
