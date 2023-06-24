import { Link } from 'react-router-dom';

const CustomLink = ({link, children }) => {
	return <Link to={link} className='dark:text-dark-subtle text-light-subtle dark:hover:text-white  hover:text-primary  transition'>{children}</Link>
};

export default CustomLink;
