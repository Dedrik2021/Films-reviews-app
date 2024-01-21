import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';
import Container from './Container'
import TopRatedWebSeries from './user/TopRatedWebSeries';
import TopRatedTvSeries from './user/TopRatedTvSeries';
import HeroSlideShow from './user/HeroSlideShow';

const Home = () => {
	return (
		<div className="dark:bg-primary bg-white min-h-screen">
			<Container>
				<NotVerified />
				<HeroSlideShow/>
				<TopRatedMovies />
				<TopRatedWebSeries />
				<TopRatedTvSeries />
			</Container>
		</div>
	);
};

export default Home;
