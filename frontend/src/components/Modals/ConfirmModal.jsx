import { ImSpinner3 } from 'react-icons/im';
import ModalContainer from './ModalContainer';

const ConfirmModal = ({ visible, busy, onConfirm, onCancel, subtitle, title }) => {
	const commonClass = 'px-3 py-1 text-white rounded';

	return (
		<ModalContainer visible={visible} ignoreContainer>
			<div className="dark:bg-primary bg-white rounded p-3">
				<h2 className="text-red-400 font-semibold text-lg">{title}</h2>
				<p className="text-secondary dark:text-white text-sm">
					{subtitle}
				</p>

				<div className="flex items-center space-x-3 mt-3">
					{busy ? (
						<p className='flex items-center space-x-2 dark:text-white text-primary'>
                            <ImSpinner3 className='animate-spin' />
                            <span>Please wait...</span>
                        </p>
					) : (
						<>
							<button type="button" className={`${commonClass} bg-red-400`} onClick={onConfirm}>
								Confirm
							</button>
							<button type="button" className={`${commonClass} bg-blue-400`} onClick={onCancel}>
								Cancel
							</button>
						</>
					)}
				</div>
			</div>
		</ModalContainer>
	);
};

export default ConfirmModal;
