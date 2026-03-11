import React from 'react';

const UserToggleTab = ({user,clickHandler}) => {
    return (
    <div className="bg-neutral-100 w-fit flex gap-1 p-1 rounded-3xl shadow-inner">
        <button onClick={(e)=>clickHandler(e)} value='Student' className={`${user==='Student'?'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md':'bg-neutral-100 text-neutral-700'} rounded-3xl px-4 py-2 font-medium transition-all`}>Student</button>
        <button onClick={(e)=>clickHandler(e)} value='Instructor' className={`${user==='Instructor'?'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md':'bg-neutral-100 text-neutral-700'} rounded-3xl px-4 py-2 font-medium transition-all`}>Instructor</button>
    </div>
    );
}

export default UserToggleTab;
