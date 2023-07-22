import { AiOutlineClose } from 'react-icons/ai';

const TagsInput = () => {
	return (
		<div>
			<div className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center">
				<Tag>Tag one</Tag>
				<Tag>Tag Two</Tag>
				<Tag>Tag Trhree</Tag>
				
				<input
					type="text"
					className="h-full w-full flex-grow bg-transparent outline-none dark:text-white"
                    placeholder='Tag one, Tag two, tag three'
				/>
			</div>
		</div>
	);
};

const Tag = ({children, onClick}) => {
	return (
		<span className="w-1/2 dark:bg-white bg-primary dark:text-primary text-white flex items-center justify-center text-sm p-1 mr-2">
			{children}
			<button type='button' onClick={onClick}>
				<AiOutlineClose size={16} />
			</button>
		</span>
	);
};

export default TagsInput;
