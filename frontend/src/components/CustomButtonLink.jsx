const CustomButtonLink = ({label, clickable = true, onClick}) => {
    const className = clickable ? "text-highlight dark:text-highlight-dark hover:underline" : "text-highlight dark:text-highlight-dark cursor-default"

    return ( 
        <button className={className} onClick={onClick} type="button">{label}</button>
    );
}

export default CustomButtonLink;