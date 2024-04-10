import ModalContainer from './ModalContainer';
import {AiOutlineStar} from 'react-icons/ai'


const ratings = new Array(10).fill("")

const AddRatingModal = () => {
	return <ModalContainer visible ignoreContainer>
        <div className="p-5 dark:bg-primary bg-white rounded">
            <div className="text-highlight dark:text-highlight-dark flex items-center">
                {ratings.map((_, i) => {
                    return (
                        <AiOutlineStar key={i} size={24}/>
                    )
                })}
            </div>
        </div>
    </ModalContainer>;
};

export default AddRatingModal;
