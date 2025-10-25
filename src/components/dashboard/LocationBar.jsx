import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LocationBar = () => {

    const location=useLocation();
    const currentLocation=location.pathname.split('/');
    // const currentLocation2=[...currentLocation];
    currentLocation.forEach((value,index,currentLocation)=>{
        currentLocation[index]=value.replace('-',' ');
    })
    currentLocation[0]='home';

    return (
        <div className='flex flex-col gap-5'>
            <nav className='flex items-center gap-3'>
                {
                    currentLocation.map((item,index)=>{
                        return<>
                        <p className={`
                            ${location.pathname.split('/').at(-1)===item.replace(' ','-') ? 'text-yellow-50' : 'text-richblack-300'}
                            text-sm capitalize`} to={item}>{item}</p>
                            {
                                index<2 && <p className='text-richblack-300 '>/</p>
                            }
                            
                        </> 
                    })
                }
            </nav>  
            <h1 className='text-richblack-5 font-semibold text-3xl capitalize'>{currentLocation.at(-1)}</h1>

        </div>
    );
}

export default LocationBar;
