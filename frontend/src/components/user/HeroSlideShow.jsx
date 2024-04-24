import { useState, useEffect, useRef, forwardRef } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useNotification } from '../../hooks';
import { getLatestUploads } from '../../api/movie';

let count = 0,
	intervalId;

const HeroSlideShow = () => {
	const [currentSlide, setCurrentSlide] = useState({});
	const [slides, setSlides] = useState([]);
	const [upNext, setUpNext] = useState([]);
	const [clonedSlide, setClonedSlide] = useState({});
	const [visible, setVisible] = useState(true);
	const slideRef = useRef();
	const clonedSlideRef = useRef();

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getLatestUploads();
		if (error) return updateNotification('error', error);

		setSlides([...movies]);
		setCurrentSlide(movies[0]);
	};

	const handleOnNxtClick = () => {
		pauseSlideShow();
		setClonedSlide(slides[count]);
		count = (count + 1) % slides.length;
		setCurrentSlide(slides[count]);

		clonedSlideRef.current.classList.add('slide-out-to-left');
		slideRef.current.classList.add('slide-in-from-right');

		updateUpNext(count);
	};

	const handleOnPrevClick = () => {
		pauseSlideShow();
		setClonedSlide(slides[count]);
		count = (count + slides.length - 1) % slides.length;
		setCurrentSlide(slides[count]);

		clonedSlideRef.current.classList.add('slide-out-to-right');
		slideRef.current.classList.add('slide-in-from-left');

		updateUpNext(count);
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
		startSlideShow();
	};

	const startSlideShow = () => {
		intervalId = setInterval(handleOnNxtClick, 3500);
	};

	const pauseSlideShow = () => {
		clearInterval(intervalId);
	};

	const updateUpNext = (currentIndex) => {
		if (!slides.length) return;

		const upNextCount = currentIndex + 1;
		const end = upNextCount + 3;

		let newSlides = [...slides];
		newSlides = newSlides.slice(upNextCount, end);

		if (!newSlides.length) newSlides = [...slides].slice(0, 3);
		setUpNext([...newSlides]);
	};

	const handleOnVisibilityChange = () => {
		const visibility = document.visibilityState;
		if (visibility === 'hidden') {
			setVisible(false);
		}
		if (visibility === 'visible') setVisible(true);
	};

	useEffect(() => {
		if (slides.length && visible) {
			startSlideShow();
			updateUpNext(count);
		} else pauseSlideShow();
	}, [slides.length, visible]);

	useEffect(() => {
		fetchLatestUploads();
		document.addEventListener('visibilitychange', handleOnVisibilityChange);

		return () => {
			pauseSlideShow();
			document.removeEventListener('visibilitychange', handleOnVisibilityChange);
		};
	}, []);

	return (
		<div className="w-full flex">
			<div className="w-4/5 aspect-video relative overflow-hidden">
				<Slide
					ref={slideRef}
					title={currentSlide.title}
					src={currentSlide.poster}
					id={currentSlide.id}
				/>
				<Slide
					ref={clonedSlideRef}
					onAnimationEnd={handleAnimationEnd}
					className="absolute inset-0"
					src={clonedSlide.poster}
					title={clonedSlide.title}
					id={currentSlide.id}
				/>

				<SlideShowController
					onNextClick={handleOnNxtClick}
					onPrevClick={handleOnPrevClick}
				/>
			</div>
			<div className="w-1/5 space-y-3 px-3">
				<h1 className="font-semibold text-2xl text-primary dark:text-white">Up Next</h1>
				{upNext.map(({ poster, id }) => {
					return (
						<img
							key={id}
							src={poster}
							alt=""
							className="aspect-video object-cover rounded"
						/>
					);
				})}
			</div>
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

const Slide = forwardRef((props, ref) => {
	const { title, id, src, className = '', ...rest } = props;

	return (
		<Link to={`/movie/${id}`} ref={ref} className={`w-full cursor-pointer block ${className}`} {...rest}>
			{src ? (
				<img className="aspect-vied object-cover absolute inset-0" src={src} alt="" />
			) : null}
			{title ? (
				<div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
					<h1 className="font-semibold text-4xl  dark:text-highlight-dark text-highlight">
						{title}
					</h1>
				</div>
			) : null}
		</Link>
	);
});

export default HeroSlideShow;
