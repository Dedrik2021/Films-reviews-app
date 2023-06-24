const SubmitBtn = ({ children }) => {
	return <button className="w-full rounded bg-white text-secondary hover:bg-opacity-90 transition font-semibold text-lg p-1" type="submit">{children}</button>;
};

export default SubmitBtn;
