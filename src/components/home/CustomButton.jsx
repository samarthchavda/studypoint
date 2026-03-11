import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({children,active,linkTo}) => {
    // Check if it's an external link
    const isExternal = linkTo?.startsWith('http://') || linkTo?.startsWith('https://');
    
    const buttonClass = `${active ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl' : 'bg-white text-neutral-700 border-2 border-neutral-300 hover:border-primary-400'}
    hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold px-6 py-3 rounded-xl`;
    
    if (isExternal) {
        return (
            <a href={linkTo} target="_blank" rel="noopener noreferrer">
                <button className={buttonClass}>
                    {children}
                </button>
            </a>
        );
    }
    
    return (
        <Link to={linkTo}>
            <button className={buttonClass}>
                {children}
            </button>      
        </Link>
    );
}

export default CustomButton;
