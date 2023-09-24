import { useState } from 'react';
import {BsTrash, BsPencilSquare} from 'react-icons/bs'

const Actors = () => {
	const [showOptions, setShowOptions] = useState(false);

	const handleOnMouseEnter = () => {
		setShowOptions(true)
	}

	const handleOnMouseLeave = () => {
		setShowOptions(false)
	}

	return (
		<div className="grid grid-cols-4 gap-3 my-5">
			<div className="bg-white shadow dark:shadow dark:bg-secondary rounded overflow-hidden">
				<div className="flex cursor-pointer h-20 relative" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
					<img
						className="w-20 object-cover aspect-square"
						src="https://img.freepik.com/premium-photo/life-style-tehnology-travel-concept-bearded-man-wearing-white-tshirt-with-digital-camera-isolated-white-background_118342-60744.jpg?w=360"
						alt=""
					/>

					<div className="px-2">
						<h2 className="text-xl text-primary dark:text-white font-semibold">
							Jhon Doe
						</h2>
						<p className="text-primary dark:text-white">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
							recusandae aliquam tempora ut consequuntur quis rem, laudantium
							voluptatibus nostrum commodi optio voluptates quos
						</p>
					</div>
					{showOptions ? (
						<div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
							<button className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition' type='button'>
								<BsTrash/>
							</button>
							<button className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition' type='button'>
								<BsPencilSquare/>
							</button>
							
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Actors;
