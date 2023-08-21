const commonPosterUI =
	'flex justify-center items-center border border-dashed rounded dark:border-dark-subtle border-light-subtle cursor-pointer';

const PosterSelector = ({ name, selectedPoster, onChange, accept, className }) => {
	return (
		<div>
			<input accept={accept} type="file" id={name} hidden name={name} onChange={onChange} />
			<label htmlFor={name}>
				{selectedPoster ? (
					<img
						className={`${commonPosterUI} object-contain ${className}`}
						src={selectedPoster}
						alt={name}
					/>
				) : (
					<PosterUI className={className} />
				)}
			</label>
		</div>
	);
};

const PosterUI = ({className}) => {
	return (
		<div className={commonPosterUI + className}>
			<span className="dark:text-dark-subtle text-light-subtle">Select Poster</span>
		</div>
	);
};

export default PosterSelector;
