import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchMovies = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('title')

    const searchMovies = (val) => {
        console.log(val);
    }

    useEffect(() => {
        if (query.trim()) searchMovies(query)
    },[query])

    return ( 
        <div>Search movies</div>
    );
}

export default SearchMovies;