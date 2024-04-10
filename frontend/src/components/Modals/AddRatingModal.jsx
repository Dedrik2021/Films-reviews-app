import {AiOutlineStar} from 'react-icons/ai'

import ModalContainer from './ModalContainer';
import SubmitBtn from '../form/SubmitBtn'


const ratings = new Array(10).fill("")

const AddRatingModal = () => {
	return <ModalContainer visible ignoreContainer>
        <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
            <div className="text-highlight dark:text-highlight-dark flex items-center">
                {ratings.map((_, i) => {
                    return (
                        <AiOutlineStar key={i} size={24}/>
                    )
                })}
            </div>
            <textarea className='w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none'></textarea>

            <SubmitBtn value="Rate This Movie"/>
        </div>
    </ModalContainer>;
};

export default AddRatingModal;
