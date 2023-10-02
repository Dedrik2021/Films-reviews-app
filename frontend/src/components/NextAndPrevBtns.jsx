const NextAndPrevBtns = ({ onNextClick, onPrevClick, className="" }) => {
    const getClasses = () => {
        return `flex justify-end items-center space-x-3 ${className}`
    }

	return (
		<div className={getClasses()}>
			<Button 
                title="Prev"
                onClick={onPrevClick}
            />
            <Button 
                title="Next"
                onClick={onNextClick}
            />
		</div>
	);
};

const Button = ({ title, onClick }) => {
	return (
		<button
			className="text-primary dark:text-white hover:underline translate"
			type="button"
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default NextAndPrevBtns;
