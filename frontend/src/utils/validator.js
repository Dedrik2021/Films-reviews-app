export const validateMovie = (movieInfo) => {
	const { title, storyLine, language, releseDate, status, type, genres, tags, cast } = movieInfo;
	if (!title.trim()) return {error: "Title is missing!"}
	if (!storyLine.trim()) return {error: "Story line is missing!"}

    if (!tags.length) return {error: "Tags are missing!"}
    for (const tag of tags) {
        if (!tag.trim()) return {error: "Invalid tags!"}
    }

	if (!releseDate.trim()) return {error: "Relese date is missing!"}

    if (!cast.length) return {error: "Cast and crew are missing!"}
    for (const c of cast) {
        if (typeof c !== 'object') return {error: "Invalid cast!"}
    }

	if (!genres.length) return {error: "Genres are missing!"}
	for (const gen of genres) {
		if (!gen.trim()) return {error: "Invalid genres!"}
	}

	if (!type.trim()) return {error: "Type is missing!"}
	if (!language.trim()) return {error: "Language is missing!"}
	if (!status.trim()) return {error: "Status is missing!"}

	return {error: null}
};