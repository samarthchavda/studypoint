import React from 'react';

const UserToggleTab = ({user,clickHandler}) => {
    return (
    <div className="bg-[#161D29] w-fit flex gap-1 p-1 rounded-3xl insetShadow">
        <button onClick={(e)=>clickHandler(e)} value='Student' className={`${user==='Student'?'bg-[#000814]':'bg-[#161D29]'} rounded-3xl px-4 py-2`}>Student</button>
        <button onClick={(e)=>clickHandler(e)} value='Instructor' className={`${user==='Instructor'?'bg-[#000814]':'bg-[#161D29]'} rounded-3xl px-4 py-2`}>Instructor</button>
    </div>
    );
}

export default UserToggleTab;
