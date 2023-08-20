import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const TagsInput = ({ name, onChange, value }) => {
	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([]);

	const inputRef = useRef();
	const tagsInputRef = useRef();

	useEffect(() => {
		onChange(tags);
	}, [tags]);

	useEffect(() => {
		if (value.length) setTags(value)
	}, [value])

	const handleOnChange = ({ target }) => {
		const { value } = target;
		if (value !== ',') setTag(value);

		onChange(tags);
	};

	const handleKeyDown = ({ key }) => {
		if (key === ',' || key === 'Enter') {
			if (!tag) return;

			if (tags.includes(tag)) return setTag('');

			setTags([...tags, tag]);
			setTag('');
		}

		if (key === 'Backspace' && !tag && tags.length) {
			const newTags = tags.filter((_, index) => index !== tags.length - 1);
			setTags([...newTags]);
		}
	};

	const removeTag = (t) => {
		const newTags = tags.filter((tag) => tag !== t);
		setTags([...newTags]);
	};

	useEffect(() => {
		inputRef.current?.scrollIntoView(false);
	}, [tag]);

	const handleOnFocus = () => {
		tagsInputRef.current.classList.remove('dark:border-dark-subtle', 'border-light-subtle');
		tagsInputRef.current.classList.add('dark:border-white', 'border-primary');
	};

	const handleOnBlur = () => {
		tagsInputRef.current.classList.add('dark:border-dark-subtle', 'border-light-subtle');
		tagsInputRef.current.classList.remove('dark:border-white', 'border-primary');
	};

	return (
		<div>
			<div
				ref={tagsInputRef}
				onKeyDown={handleKeyDown}
				className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center overflow-x-auto custom-scroll-bar transition"
			>
				{tags.map((t, i) => {
					return (
						<Tag onClick={() => removeTag(t)} key={i}>
							{t}
						</Tag>
					);
				})}
				<input
					ref={inputRef}
					type="text"
					name={name}
					className="h-full w-full flex-grow bg-transparent outline-none dark:text-white"
					placeholder="Tag one, Tag two..."
					value={tag}
					onChange={handleOnChange}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
				/>
			</div>
		</div>
	);
};

const Tag = ({ children, onClick }) => {
	return (
		<span className="w-1/2 dark:bg-white bg-primary dark:text-primary text-white flex items-center justify-center text-sm p-1 whitespace-nowrap">
			{children}
			<button type="button" onClick={onClick}>
				<AiOutlineClose size={16} />
			</button>
		</span>
	);
};

export default TagsInput;
