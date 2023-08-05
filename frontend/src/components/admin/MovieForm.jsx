import { useState } from 'react';

import TagsInput from './TagsInput';
import LiveSearch from '../LiveSearch';
import { commonInputClasses } from '../../utils/theme';

export const results = [
	{
		id: '1',
		avatar: 'https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'John Doe',
	},
	{
		id: '2',
		avatar: 'https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Chandri Anggara',
	},
	{
		id: '3',
		avatar: 'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Amin RK',
	},
	{
		id: '4',
		avatar: 'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Edward Howell',
	},
	{
		id: '5',
		avatar: 'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Amin RK',
	},
	{
		id: '6',
		avatar: 'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Edward Howell',
	},
];

const defaultMuvieInfo = {
	title: "",
	storyLine: "",
	tags: [],
	cast: [],
	director: {},
	writers: [],
	releseDate: "",
	poster: null,
	genres: [],
	type: "",
	language: "",
	status: ""
}

const MovieForm = () => {
	const [movieInfo, setMovieInfo] = useState({...defaultMuvieInfo})

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const renderItem = (result) => {
		return (
			<div className="flex space-x-2 rounded overflow-hidden" key={result.key}>
				<img
					className="w-16 h-16 rounded object-cover"
					src={result.avatar}
					alt={result.name}
				/>
				<p className="dark:text-white font-semibold">{result.name}</p>
			</div>
		);
	}

	const handleChange = ({target}) => {
		const {value, name} = target
		setMovieInfo({...movieInfo, [name]: value})
	}

	const {title, storyLine, director} = movieInfo

	return (
		<form onSubmit={handleSubmit} className="flex space-x-3">
			<div className="w-[70%] h-5 space-y-5">
				<div>
					<Label htmlFor="title">Title</Label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={handleChange}
						name='title'
						className={`${commonInputClasses} border-b-2 font-semibold text-xl p-1`}
						placeholder="Title"
					/>
				</div>
				<div>
					<Label htmlFor="storyLine">Story Line</Label>
					<textarea
						name='storyLine'
						value={storyLine}
						onChange={handleChange}
						id="storyLine"
						className={`${commonInputClasses} resize-none h-24 border-b-2`}
						placeholder="Movie story line"
					></textarea>
				</div>
				<TagsInput />
				<LiveSearch
					placeholder='Search profile...'
					results={results}
					renderItem={renderItem}
					onSelect={(result) => console.log(result)}
				/>
			</div>
			<div className="w-[30%] h-5 bg-blue-400"></div>
		</form>
	);
};

const Label = ({ children, htmlFor }) => {
	return (
		<label htmlFor={htmlFor} className="dark:text-dark-subtle text-light-subtle font-semibold">
			{children}
		</label>
	);
};

export default MovieForm;
