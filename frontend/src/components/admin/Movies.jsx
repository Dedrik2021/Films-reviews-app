import { useState, useEffect } from "react";

import MovieListItem from "../MovieListItem";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";

const limit = 10
let currentPageNo = 0

const Movies = () => {
    const [movies, setMovies] = useState([])

    const {updateNotification} = useNotification()

    const fetchMovies = async (pageNo) => {
        const {error, movies} = await getMovies(pageNo, limit)
        if (error) updateNotification("error", error)

        setMovies([...movies])
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return ( 
        <div className="space-y-3 p-5">
            {movies.map((movie) => {
                return <MovieListItem key={movie.id} movie={movie}/>
            })}
        </div> 
    );
}

export default Movies;