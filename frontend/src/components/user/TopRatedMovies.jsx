import GridContainer from '../GridContainer';

const TopRatedMovies = () => {
	return (
		<GridContainer>
			{Array(5)
				.fill('')
				.map((_, i) => {
					return <div className="p-5 bg-red-200" key={i}></div>;
				})}
		</GridContainer>
	);
};

export default TopRatedMovies;
