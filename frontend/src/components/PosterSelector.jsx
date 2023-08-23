const commonPosterUI =
	'flex justify-center items-center aspect-square border border-dashed rounded dark:border-dark-subtle border-light-subtle cursor-pointer p-1';

const PosterSelector = ({ name, selectedPoster, onChange, accept, className, label }) => {
	return (
		<div>
			<input accept={accept} type="file" id={name} hidden name={name} onChange={onChange} />
			<label htmlFor={name}>
				{selectedPoster ? (
					<img
						className={`${commonPosterUI} object-cover ${className}`}
						src={selectedPoster}
						alt={name}
					/>
				) : (
					<PosterUI className={className} label={label} />
				)}
			</label>
		</div>
	);
};

const PosterUI = ({className, label}) => {
	return (
		<div className={commonPosterUI + className}>
			<span className="dark:text-dark-subtle text-light-subtle">{label}</span>
		</div>
	);
};

export default PosterSelector;
