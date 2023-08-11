import {ImSpinner3} from 'react-icons/im'

const SubmitBtn = ({ children, busy, type, onClick }) => {
	return <button onClick={onClick} className="w-full rounded dark:bg-white bg-secondary  dark:text-secondary hover:bg-opacity-90 transition font-semibold text-lg h-10 text-white flex items-center justify-center" type={type || "submit"}>{busy ? <ImSpinner3 className='animate-spin'/> : children}</button>;
};

export default SubmitBtn;
