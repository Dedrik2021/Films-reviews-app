const commonPosterUI = "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer"

const PosterSelector = ({name, selectedPoster}) => {
    return ( 
        <div>
            <input type="file" id={name} hidden />
            <label htmlFor={name}>
                {selectedPoster ? <img className={`${commonPosterUI} object-cover`} src={selectedPoster} alt={name} /> :  <PosterUI/>}
            </label>
        </div>
    );
}

const PosterUI = () => {


    return (
        <div className={commonPosterUI}>
            <span className="dark:text-dark-subtle text-light-subtle">Select Poster</span>
        </div>
    )
}

export default PosterSelector;