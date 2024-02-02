import { useState, useEffect, useRef } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

import { useNotification } from '../../hooks';
import { getLatestUploads } from '../../api/movie';

let count = 0;

const HeroSlideShow = () => {
	const [currentSlide, setCurrentSlide] = useState({});
	const [slides, setSlides] = useState([]);
	const [clonedSlide, setClonedSlide] = useState({});
	const slideRef = useRef();
	const clonedSlideRef = useRef();

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getLatestUploads();
		if (error) return updateNotification('error', error);

		setSlides([...movies]);
		setCurrentSlide(movies[0]);
	};

	useEffect(() => {
		fetchLatestUploads();
	}, []);

	const handleOnNxtClick = () => {
		setClonedSlide(slides[count]);
		count = (count + 1) % slides.length;
		setCurrentSlide(slides[count]);

		clonedSlideRef.current.classList.add('slide-out-to-left');
		slideRef.current.classList.add('slide-in-from-right');
	};

	const handleOnPrevClick = () => {
		setClonedSlide(slides[count]);
		count = (count + slides.length - 1) % slides.length;
		setCurrentSlide(slides[count]);

		clonedSlideRef.current.classList.add('slide-out-to-right');
		slideRef.current.classList.add('slide-in-from-left');
	};

	const handleAnimationEnd = () => {
		const classes = [
			'slide-out-to-left',
			'slide-in-from-right',
			'slide-out-to-right',
			'slide-in-from-left',
		];
		slideRef.current.classList.remove(...classes);
		clonedSlideRef.current.classList.remove(...classes);

		setClonedSlide({});
	};

	return (
		<div className="w-full flex">
			<div className="w-4/5 aspect-video relative overflow-hidden">
				<img
					onAnimationEnd={handleAnimationEnd}
					ref={slideRef}
					className="aspect-vied object-cover"
					src={slides.poster}
					alt=""
				/>
				<img
					// onAnimationEnd={handleAnimationEnd}
					ref={clonedSlideRef}
					className="aspect-vied object-cover absolute inset-0"
					src={clonedSlide.poster}
					alt=""
				/>
				<SlideShowController
					onNextClick={handleOnNxtClick}
					onPrevClick={handleOnPrevClick}
				/>
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
