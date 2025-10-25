import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({children,active,linkTo}) => {
    // Check if it's an external link
    const isExternal = linkTo?.startsWith('http://') || linkTo?.startsWith('https://');
    
    const buttonClass = `${active ? 'bg-yellow-100 ' : 'bg-richblack-700 text-white '}hover:scale-95 transition drop-shadow-[1px_1px_1px_rgba(255,255,255,0.8)] flex items-center gap-1 font-[550]  px-3 py-2 rounded-md`;
    
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
