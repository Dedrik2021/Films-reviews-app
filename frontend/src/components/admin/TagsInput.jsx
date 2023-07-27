import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const TagsInput = () => {
	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([]);

	const handleOnChange = ({ target }) => {
		const { value } = target;
		if (value !== ',') setTag(value);
	};

	const handleKeyDown = ({ key }) => {
		if (key === ',' || key === 'Enter') {
			if (!tag) return;

			if (tags.includes(tag)) return setTag('');

			setTags([...tags, tag]);
			setTag('');
		}

		if (key === "Backspace" && !tag && tags.length) {
			const newTags = tags.filter((_, index) => index !== tags.length - 1)
			setTags([...newTags])
		}
	};

	const removeTag = (t) => {
		const newTags = tags.filter((tag) => tag !== t)
		setTags([...newTags])
	}

	return (
		<div>
			<div
				onKeyDown={handleKeyDown}
				className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center overflow-x-auto custom-scroll-bar"
			>
				{tags.map((t) => {
					return <Tag onClick={() => removeTag(t)} key={t}>{t}</Tag>;
				})}
				<input
					type="text"
					className="h-full w-full flex-grow bg-transparent outline-none dark:text-white"
					placeholder="Tag one, Tag two..."
					value={tag}
					onChange={handleOnChange}
				/>
			</div>
		</div>
	);
};

const Tag = ({ children, onClick }) => {
	return (
		<span className="w-1/2 dark:bg-white bg-primary dark:text-primary text-white flex items-center justify-center text-sm p-1 mr-2 whitespace-nowrap">
			{children}
			<button type="button" onClick={onClick}>
				<AiOutlineClose size={16} />
			</button>
		</span>
	);
};

export default TagsInput;
