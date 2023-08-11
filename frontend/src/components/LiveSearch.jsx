import { useState, useEffect, useRef, forwardRef } from 'react';
import { commonInputClasses } from '../utils/theme';

const LiveSearch = ({
	results = [],
	selectedResultStyle,
	resultContainerStyle,
	renderItem = null,
    placeholder = "",
	value = "",
	onChange = null,
    onSelect = null,
    inputStyle,
    name
}) => {
	const [displaySearch, setDisplaySearch] = useState(false);
	const [focusedIndex, setfocusedIndex] = useState(-1);

	const handleOnFocus = () => {
		if (results.length) setDisplaySearch(true);
	};

	const handleOnBlur = () => {
		setDisplaySearch(false);
		setfocusedIndex(-1);
	};

	const handleSelection = (selectedItem) => {
		if(selectedItem) {
			onSelect(selectedItem)
			handleOnBlur()
		};
	};

	const handleKeyDown = ({ key }) => {
		let nextCount;
		const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
		if (!keys.includes(key)) return;

		if (key === 'ArrowDown') {
			nextCount = (focusedIndex + 1) % results.length;
		}

		if (key === 'ArrowUp') {
			nextCount = (focusedIndex + results.length - 1) % results.length;
		}

		if (key === 'Escape') return handleOnBlur();

		if (key === 'Enter') return handleSelection(results[focusedIndex]);

		setfocusedIndex(nextCount);
	};

    const getInputStyle = () => {
        return inputStyle ? inputStyle : `${commonInputClasses} border-2 rounded p-1 pl-2 pr-2 text-lg`
    }

	return (
		<div className="relative">
			<label htmlFor="search"></label>
			<input
				type="text"
				id={name}
                name={name}
				className={getInputStyle()}
				placeholder={placeholder}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				onKeyDown={handleKeyDown}
				value={value}
				onChange={onChange}
			/>
			<SearchResults
				visible={displaySearch}
				results={results}
				focusedIndex={focusedIndex}
				onSelect={handleSelection}
				renderItem={renderItem}
				resultContainerStyle={resultContainerStyle}
				selectedResultStyle={selectedResultStyle}
			/>
		</div>
	);
};

const SearchResults = ({
	visible,
	results = [],
	focusedIndex,
	onSelect,
	renderItem,
	resultContainerStyle,
	selectedResultStyle,
}) => {
	const resultContainerRef = useRef();

	useEffect(() => {
		resultContainerRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	}, [focusedIndex]);

	if (!visible) return null;

	return (
		<div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 overflow-auto space-y-2 mt-1 custom-scroll-bar z-20">
			{results.map((result, index) => {
				const getSelectedClass = () => {
					return selectedResultStyle
						? selectedResultStyle
						: 'dark:bg-dark-subtle bg-light-subtle';
				};

				return (
					<ResultCard
						key={index.toString()}
						ref={index === focusedIndex ? resultContainerRef : null}
						item={result}
						index={index}
						onMouseDown={() => onSelect(result)}
						renderItem={renderItem}
						resultContainerStyle={resultContainerStyle}
						selectedResultStyle={index === focusedIndex ? getSelectedClass() : ''}
					/>
				);
			})}
		</div>
	);
};

const ResultCard = forwardRef((props, ref) => {
	const { item, renderItem, resultContainerStyle, selectedResultStyle, onMouseDown } = props;

	const getClasses = () => {
		if (resultContainerStyle) {
			return resultContainerStyle + ' ' + selectedResultStyle;
		}

		return `${selectedResultStyle}  cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition flex space-x-2`;
	};
	return (
		<div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
			{renderItem(item)}
		</div>
	);
});

export default LiveSearch;
