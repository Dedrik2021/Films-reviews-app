import ModalContainer from "./ModalContainer";
import MovieForm from "../admin/MovieForm";

const UpdateMovie = ({visible}) => {
    return ( 
        <ModalContainer visible={visible} >
            <MovieForm/>
        </ModalContainer>
    );
}

export default UpdateMovie;