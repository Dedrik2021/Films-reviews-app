import { Link } from 'react-router-dom';

const CustomLink = ({link, children }) => {
	return <Link to={link} className='text-dark-subtle hover:text-white transition'>{children}</Link>
};

export default CustomLink;
