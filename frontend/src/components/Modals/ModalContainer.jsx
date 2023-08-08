const ModalContainer = ({ visible, children, onClose }) => {
	const handleClick = (e) => {
		if (e.target.id === 'modal-container') onClose();
	};

	if (!visible) return null;

	return (
		<div
			onClick={handleClick}
			id="modal-container"
			className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
		>
			<div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2 custom-scroll-bar">
				{children}
			</div>
		</div>
	);
};

export default ModalContainer;