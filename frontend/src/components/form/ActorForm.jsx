import { commonInputClasses } from '../../utils/theme';

const ActorForm = ({ title, btnTitle }) => {
	return (
		<div className="dark:bg-primary bg-white p-3 w-[35rem] rounded">
			<div className="flex justify-between items-center mb-3">
				<h1 className="font-semibold text-xl dark:text-white text-primary">{title}</h1>
				<button
					type="submit"
					className="px-3 py-3 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded"
				>
					{btnTitle}
				</button>
			</div>
			<form className="flex space-x-2">
				<img
					src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
					alt=""
					className="w-36 h-36 aspect-square object-cover rounded"
				/>
				<div className="flex-grow flex flex-col">
					<input
						type="text"
						className={`${commonInputClasses} border-b-2`}
						placeholder="Enter Name..."
					/>
					<textarea
						placeholder="About"
						className={`${commonInputClasses} border-b-2 resize-none h-full`}
					></textarea>
				</div>
			</form>
		</div>
	);
};

export default ActorForm;
