const Label = ({ children, htmlFor }) => {
	return (
		<label
			htmlFor={htmlFor}
			className="dark:text-dark-subtle text-light-subtle flex justify-center font-semibold"
		>
			{children}
		</label>
	);
};

export default Label;
