const SubmitBtn = ({ children }) => {
	return <button className="w-full rounded dark:bg-white bg-secondary  dark:text-secondary hover:bg-opacity-90 transition font-semibold text-lg p-1 text-white" type="submit">{children}</button>;
};

export default SubmitBtn;
