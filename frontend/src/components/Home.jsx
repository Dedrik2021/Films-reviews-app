import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';
import Container from './Container'

const Home = () => {
	return (
		<div className="dark:bg-primary bg-white min-h-screen">
			<Container>
				<NotVerified />
				<TopRatedMovies />
			</Container>
		</div>
	);
};

export default Home;
