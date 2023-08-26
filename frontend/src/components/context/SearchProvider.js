import { createContext, useState } from 'react';
import { useNotification } from '../../hooks';

const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
	return (...args) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};

const SearchProvider = ({ children }) => {
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const [resultNotFound, setResultNotFound] = useState(false)

    const {updateNotification} = useNotification()

    const search = async (method, query) => {
        const {error, results} = await method(query)
        if (error) return updateNotification('error', error)

        if (!results.length) return setResultNotFound(true)
        setResults(results)
    }

    const debiunceFunc = debounce(search, 300)

    const handleSearch = (method, query) => {
        setSearching(true)
        if (!query.trim()) {
            setSearching(false)
            setResults([])
            setResultNotFound(false)
        }
    }

	return <SearchContext.Provider value={{handleSearch, searching, resultNotFound, results}}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
