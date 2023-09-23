import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';

const LatestUploads = () => {
	return (
		<div className="bg-white dark:shadow shadow dark:bg-secondary p-5 rounded col-span-2">
			<h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
				Recent Uploads
			</h1>

			<MovieListItem />
		</div>
	);
};

const MovieListItem = () => {
	return (
		<table className="w-full border-b">
			<tbody>
				<tr>
					<td>
						<div className="w-24 mr-5">
							<img
								className="w-full aspect-video"
								src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=300&q=80"
								alt=""
							/>
						</div>
					</td>
					<td className="w-full">
						<div>
							<h2 className="font-semibold text-lg text-primary dark:text-white">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</h2>
							<div className="space-x-1">
								<span className="text-primary dark:text-white text-xs">Action</span>
								<span className="text-primary dark:text-white text-xs">Drama</span>
							</div>
						</div>
					</td>
					<td>
						<p className="text-primary dark:text-white mr-2">public</p>
					</td>
					<td>
						<div className="flex items-center justify-center space-x-2 text-primary dark:text-white text-lg">
							<button type="button">
								<BsTrash />
							</button>
							<button type="button">
								<BsPencilSquare />
							</button>
							<button type="button">
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
