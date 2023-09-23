const Actors = () => {
	return (
		<div className="grid grid-cols-4 gap-3 my-5">
			<div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
				<div className="flex cursor-pointer">
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
				</div>
			</div>
		</div>
	);
};

export default Actors;
