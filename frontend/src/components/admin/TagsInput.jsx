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
	};

	return (
		<div>
			<div
				onKeyDown={handleKeyDown}
				className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center"
			>
				{tags.map((t) => {
					<Tag key={t}>{t}</Tag>;
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
		<span className="w-1/2 dark:bg-white bg-primary dark:text-primary text-white flex items-center justify-center text-sm p-1 mr-2">
			{children}
			<button type="button" onClick={onClick}>
				<AiOutlineClose size={16} />
			</button>
		</span>
	);
};

export default TagsInput;
