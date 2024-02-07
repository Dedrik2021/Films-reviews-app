import NotVerified from './user/NotVerified';
import TopRatedMovies from './user/TopRatedMovies';
import Container from './Container';
import TopRatedWebSeries from './user/TopRatedWebSeries';
import TopRatedTvSeries from './user/TopRatedTvSeries';
import HeroSlideShow from './user/HeroSlideShow';

const Home = () => {
	return (
		<div className="dark:bg-primary bg-white min-h-screen">
			<Container className="px-2 xl:p-0">
				<NotVerified />
				<HeroSlideShow />
				<div className="space-y-3 py-3">
					<TopRatedMovies />
					<TopRatedWebSeries />
					<TopRatedTvSeries />
				</div>
			</Container>
		</div>
	);
};

export default Home;
