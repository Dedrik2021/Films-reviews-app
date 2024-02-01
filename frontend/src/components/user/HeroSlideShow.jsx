import { useState, useEffect, useRef } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

import { useNotification } from '../../hooks';
import { getLatestUploads } from '../../api/movie';

let count = 0;

const HeroSlideShow = () => {
	const [slide, setSlide] = useState({});
	const [slides, setSlides] = useState([]);
	const [clonedSlide, setClonedSlide] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const slideRef = useRef();
	const clonedSlideRef = useRef();

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getLatestUploads();
		if (error) return updateNotification('error', error);

		setSlides([...movies]);
		setSlide(movies[0]);
	};

	useEffect(() => {
		fetchLatestUploads();
	}, []);

	const handleOnNxtClick = () => {
		setClonedSlide(slide[count])
		count = (count + 1) % slides.length;
		setSlide(slides[count]);
		setCurrentIndex(count);

		clonedSlideRef.current.classList.add('slide-out-to-left');
		slideRef.current.classList.add('slide-in-from-right');
	};

	const handleAnimationEnd = () => {
		slideRef.current.classList.remove('slide-in-from-right');
		clonedSlideRef.current.classList.remove('slide-out-to-left');

		setClonedSlide({})
	};

	return (
		<div className="w-full flex">
			<div className="w-4/5 aspect-video relative overflow-hidden">
				<img
					onAnimationEnd={handleAnimationEnd}
					ref={slideRef}
					className="aspect-vied object-cover"
					src={slide.poster}
					alt=""
				/>
				<img
					// onAnimationEnd={handleAnimationEnd}
					ref={clonedSlideRef}
					className="aspect-vied object-cover absolute inset-0"
					src={clonedSlide.poster}
					alt=""
				/>
				<SlideShowController onNextClick={handleOnNxtClick} />
			</div>
			<div className="w-1/5 aspect-video bg-red-300"></div>
		</div>
	);
};

const SlideShowController = ({ onNextClick, onPrevClick }) => {
	const btnClass = 'bg-primary rounded border-2 text-white text-xl p-2 outline-none';

	return (
		<div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2 ">
			<button type="button" className={btnClass} onClick={onPrevClick}>
				<AiOutlineDoubleLeft />
			</button>
			<button type="button" className={btnClass} onClick={onNextClick}>
				<AiOutlineDoubleRight />
			</button>
		</div>
	);
};

export default HeroSlideShow;
