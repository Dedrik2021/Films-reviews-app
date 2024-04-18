import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { useState } from 'react';

import SubmitBtn from '../SubmitBtn'


const ratings = new Array(10).fill("")

const RatingForm = ({busy, onSubmit}) => {
    const [content, setContent] = useState("")
    const [selectedRatings, setSelectedRatings] = useState([...ratings])

    const handleMouseEnter = (index) => {
        const ratings = new Array(index + 1).fill(index)
        setSelectedRatings([...ratings])
    }

    const handleOnChange = ({target}) => {
        setContent(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedRatings.length) return
        const data = {
            rating: selectedRatings.length,
            content
        }

        onSubmit(data)
    }

	return <div>
        <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
            <div className="text-highlight dark:text-highlight-dark flex items-center relative">
                
                <StarsOutline ratings={ratings}  handleMouseEnter={handleMouseEnter} />
                <div className="flex items-center absolute top-1/2 -translate-y-1/2">
                    <StarsFilled ratings={selectedRatings} handleMouseEnter={handleMouseEnter} />
                </div>
            </div>
            <textarea value={content} onChange={handleOnChange} className='w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none'></textarea>

            <SubmitBtn busy={busy} onClick={handleSubmit} value="Rate This Movie"/>
        </div>
    </div>;
};

const StarsOutline = ({ratings, handleMouseEnter}) => {
    return ratings.map((_, i) => {
        return (
            <AiOutlineStar onMouseEnter={() => handleMouseEnter(i)} key={i} size={24} className='cursor-pointer'/>
        )
    })
}

const StarsFilled = ({ratings, handleMouseEnter}) => {
    return ratings.map((_, i) => {
        return (
        <AiFillStar onMouseEnter={() => handleMouseEnter(i)} key={i} size={24} className='cursor-pointer'/>
    )
    })
}

export default RatingForm;
