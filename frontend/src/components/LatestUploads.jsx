const LatestUploads = () => {
    return ( 
        <div className="bg-white dark:shadow shadow dark:bg-secondary p-5 rounded col-span-2">
            <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
				Recent Uploads
			</h1>

            <MovieListItem/>
        </div>
    );
}

const MovieListItem = () => {
    return (
        <p>movie list</p>
    )
}

export default LatestUploads;