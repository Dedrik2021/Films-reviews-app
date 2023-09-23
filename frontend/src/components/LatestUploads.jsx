import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';

const LatestUploads = () => {
	return (
		<div className="bg-white dark:shadow shadow dark:bg-secondary p-5 rounded col-span-2">
			<h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
				Recent Uploads
			</h1>

			<MovieListItem
				movie={{
					poster: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=300&q=80',
					title: 'lorem ipsum tra tra tra', status: "public", genres: ["Action", "Drama"]
				}}
			/>
		</div>
	);
};

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

export default LatestUploads;
