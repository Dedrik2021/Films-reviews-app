const FormContainer = ({children}) => {
	return (
		<div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex fjustify-center items-center">{children}</div>
	);
};

export default FormContainer;
