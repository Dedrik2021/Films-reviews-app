import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';
import { useState } from 'react';

import ConfirmModal from './Modals/ConfirmModal';
import { deleteMovie } from '../api/movie';
import { useNotification } from '../hooks';

const MovieListItem = ({ movie, afterDelete }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [busy, setBusy] = useState(false);
	const { updateNotification } = useNotification();

	const hideConfirmModal = () => {
		setShowConfirmModal(false);
	};

	const displayConfirmModal = () => setShowConfirmModal(true);

	const handleOnDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteMovie(movie.id);
		setBusy(false);

		if (error) return updateNotification('error', error);

		updateNotification('success', message);
		afterDelete(movie);
		hideConfirmModal();
	};

	return (
		<>
			<MovieCard movie={movie} onDeleteClick={displayConfirmModal} />
			<div className="p-0">
				<ConfirmModal
					visible={showConfirmModal}
					onConfirm={handleOnDeleteConfirm}
					onCancel={hideConfirmModal}
					title="Are you sure?"
					subtitle="This action will be remove movie permanently!"
					busy={busy}
				/>
			</div>
		</>
	);
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
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
										<span
											key={g + i}
											className="text-primary dark:text-white text-xs"
										>
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
							<button
								className="hover:text-black transition"
								type="button"
								onClick={onDeleteClick}
							>
								<BsTrash />
							</button>
							<button
								className="hover:text-black  transition "
								type="button"
								onClick={onEditClick}
							>
								<BsPencilSquare />
							</button>
							<button
								className=" hover:text-black transition"
								type="button"
								onClick={onOpenClick}
							>
								<BsBoxArrowUpRight />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default MovieListItem;
