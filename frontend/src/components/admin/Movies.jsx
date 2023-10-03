import { useState } from "react";

import MovieListItem from "../MovieListItem";

const Movies = () => {
    const [movies, setMovies] = useState([])

    return ( 
        <div className="space-y-3 p-5">
            {movies.map((movie) => {
                return <MovieListItem key={movie.id} movie={movie}/>
            })}
        </div> 
    );
}

export default Movies;