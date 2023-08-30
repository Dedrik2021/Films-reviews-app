import Label from "./Label";

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
	const renderBage = () => {
		if (!badge) return null;

		return (
			<span className="dark:bg-dark-subtle bg-light-subtle text-white absolute translate-x-5 -translate-y-1 text-xs top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center">
				{badge <= 9 ? badge : '9+'}
			</span>
		);
	};

	return (
		<div className="relative">
			<Label htmlFor={htmlFor}>{children}</Label>
			{renderBage()}
		</div>
	);
};

export default LabelWithBadge