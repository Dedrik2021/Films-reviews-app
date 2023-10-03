import { useState, useEffect } from "react";

import MovieListItem from "../MovieListItem";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import NextAndPrevBtns from "../NextAndPrevBtns";

const limit = 10
let currentPageNo = 0

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [rachedToEnd, setRachedToEnd] = useState(false)

    const {updateNotification} = useNotification()

    const fetchMovies = async (pageNo) => {
        const {error, movies} = await getMovies(pageNo, limit)
        if (error) updateNotification("error", error)

        if (!movies.length) {
            currentPageNo = pageNo - 1
            return setRachedToEnd(true)
        }

        setMovies([...movies])
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const handleOnNextClick = () => {
        if (rachedToEnd) return
        currentPageNo += 1
        fetchMovies(currentPageNo)
    }

    const handleOnPrevClick = () => {

    }

    return ( 
        <div className="space-y-3 p-5">
            {movies.map((movie) => {
                return <MovieListItem key={movie.id} movie={movie}/>
            })}

            <NextAndPrevBtns
                className="mt-5"
                onNextClick={handleOnNextClick}
                onPrevClick={handleOnPrevClick}
            />
        </div> 
    );
}

export default Movies;