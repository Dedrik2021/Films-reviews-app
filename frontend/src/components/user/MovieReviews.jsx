import Container from "../Container"
import CustomButtonLink from "../CustomButtonLink";

const MovieReviews = () => {
    return ( 
        <div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container className="xl:px-0 px-2 py-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold dark:text-white text-secondary">
                        <span className="text-light-subtle dark:text-dark-subtle font-normal">
                            Reviews for:
                        </span>{" "}
                        This is the title
                    </h1>
                    <CustomButtonLink label={"Find My Review"} />
                </div>
            </Container>
        </div>
    );
}

export default MovieReviews;