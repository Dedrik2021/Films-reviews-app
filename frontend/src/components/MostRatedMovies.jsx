import { useState, useEffect } from "react";

import { getMostRatedMovies } from "../api/movie";
import { useNotification } from "../hooks";

const MostRatedMovies = () => {
    const [movies, setMovies] = useState([]);

    const { updateNotification } = useNotification();

    const fetchMostRatedMovies = async () => {
        const { error, movies } = await getMostRatedMovies();
        if (error) return updateNotification("error", error);

        setMovies([...movies]);
    }

    useEffect(() => {
        fetchMostRatedMovies();
    }, []);

	return <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
        {movies.map((movie) => {
            return <p>{movie.title}</p>
        })}
    </div>;
};

export default MostRatedMovies;
