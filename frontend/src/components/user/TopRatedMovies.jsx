import { useState, useEffect } from 'react';

import GridContainer from '../GridContainer';
import { useNotification } from '../../hooks';
import { getTopRatedMovies } from '../../api/movie';

const TopRatedMovies = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async () => {
        const {error, movies} = await getTopRatedMovies()
        if (error) return updateNotification("error", error)

        setMovies([...movies])
    };

    useEffect(() => {
        fetchMovies()
    }, [])

	return (
		<GridContainer>
			{movies.map((_, i) => {
					return <div className="p-5 bg-red-200" key={i}></div>;
				})}
		</GridContainer>
	);
};

export default TopRatedMovies;
