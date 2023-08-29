import { useState } from "react";

import LiveSearch from "./LiveSearch";
import { renderItem } from "../utils/helper";
import { useSearch } from "../hooks";
import { searchActor } from "../api/actor";

const WritersSelector = ({onSelect}) => {
    const [profiles, setProfiles] = useState([])
    const [value, setValue] = useState("")

    const {handleSearch, resetSearch} = useSearch()

    const handleChange = ({target}) => {
        const {value} = target
        setValue(value)
        handleSearch(searchActor, value, setProfiles)
    }

    const handleOnSelect = (profile) => {
        setValue('')
        onSelect(profile)
        setProfiles([])
        resetSearch()
    }

	return (
		<LiveSearch
			name="writers"
			placeholder="Search profile..."
			results={profiles}
			renderItem={renderItem}
			onSelect={handleOnSelect}
			onChange={handleChange}
			value={value}
		/>
	);
};

export default WritersSelector;
