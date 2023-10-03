import MovieListItem from "./MovieListItem";

const LatestUploads = () => {
	return (
		<div className="bg-white dark:shadow shadow dark:bg-secondary p-5 rounded col-span-2">
			<h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
				Recent Uploads
			</h1>

			<MovieListItem
				movie={{
					poster: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=300&q=80',
					title: 'lorem ipsum tra tra tra', status: "public", genres: ["Action", "Drama"]
				}}
			/>
		</div>
	);
};

export default LatestUploads;
