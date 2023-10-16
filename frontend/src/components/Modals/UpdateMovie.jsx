import ModalContainer from "./ModalContainer";
import MovieForm from "../admin/MovieForm";

const UpdateMovie = ({visible, initialState}) => {
    return ( 
        <ModalContainer visible={visible} >
            <MovieForm initialState={initialState} />
        </ModalContainer>
    );
}

export default UpdateMovie;