const Navbar = () => {
	return (
		<div className="bg-secondary">
			<div className="  max-w-screen-xl mx-auto p-2">
				<div className="flex justify-between items-center">
					<img className="h-10" src="./logo.png" alt="" />
					<ul>
						<li className="text-white">Login</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
