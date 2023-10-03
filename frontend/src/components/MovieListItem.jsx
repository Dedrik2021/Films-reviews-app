import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';

const MovieListItem = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
	const { poster, title, genres = [], status } = movie;

	return (
		<table className="w-full border-b">
			<tbody>
				<tr>
					<td>
						<div className="w-24 mr-5">
							<img className="w-full aspect-video" src={poster} alt={title} />
						</div>
					</td>
					<td className="w-full">
						<div>
							<h2 className="font-semibold text-lg text-primary dark:text-white">
								{title}
							</h2>
							<div className="space-x-1">
								{genres.map((g, i) => {
									return (
										<span key={g+i} className="text-primary dark:text-white text-xs">
											{genres.length > 1 ? `${g},` : g}
										</span>
									);
								})}
							</div>
						</div>
					</td>
					<td>
						<p className="text-primary dark:text-white mr-2">{status}</p>
					</td>
					<td>
						<div className="flex items-center justify-center space-x-2 text-primary dark:text-white text-lg ">
							<button className='hover:text-black transition' type="button" onClick={onDeleteClick}>
								<BsTrash />
							</button>
							<button className='hover:text-black  transition ' type="button" onClick={onEditClick}>
								<BsPencilSquare />
							</button>
							<button className=' hover:text-black transition' type="button" onClick={onOpenClick}>
								<BsBoxArrowUpRight />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default MovieListItem