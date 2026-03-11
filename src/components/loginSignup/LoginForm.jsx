import React, { useDebugValue, useState } from 'react';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UserToggleTab from './UserToggleTab';
import { Link } from 'react-router-dom';
import { login } from '../../services/operations/authApi';
import { useDispatch } from 'react-redux';

const LoginForm = ({setIsLoggedIn,changeTab}) => {
    const[user,setUser]=useState('Student');
    const [showPass, setshowPass] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userHandler=(e)=>{ 
        if(e.target.value!=user){user==='Student'?setUser('Instructor'):setUser('Student');
        changeTab();    }
    }

    function passHandler(){
        setshowPass(!showPass);
    }

    const [formData,setFormData]=useState({
        email: "",
        password:"",
    })

    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value,
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }

    return (
        <div className='flex flex-col gap-4'>
            <UserToggleTab user={user} clickHandler={userHandler}/>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="text-neutral-800 font-medium">Email Address<span className='text-red-500 text-sm ml-1'>*</span></label>
            <input onChange={changeHandler} value={formData.email} className='text-neutral-800 rounded-md px-3 py-2 w-full outline-none bg-white border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all' type="email" required placeholder='Enter email address' name='email' id='email'/>
            </div>  

            <div className='flex flex-col gap-1 relative'>
            <label htmlFor="password" className="text-neutral-800 font-medium">Password<span className='text-red-500 text-sm ml-1'>*</span></label>
            <div className='flex items-center gap-1 bg-white border border-neutral-300 px-3 py-2 rounded-md focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 transition-all'>
            <input onChange={changeHandler} value={formData.password} className='text-neutral-800 rounded-md w-full outline-none bg-white' type={showPass?("text"):("password")} required placeholder='Enter Password' name='password' id='password'/>
            <div onClick={passHandler} className='cursor-pointer text-neutral-600 hover:text-primary-600 transition-colors'>
            {
                showPass?(<FaEyeSlash/>):(   <FaEye/>    )
            }
            </div>
            </div>
            <Link to='/signUp' className='absolute -bottom-6 left-0 text-[12px] text-primary-600 hover:text-primary-700 font-medium'>New user? Signup </Link>
            <Link to='/forgot-password' className='absolute -bottom-6 right-0 text-[12px] text-primary-600 hover:text-primary-700 font-medium'>Forgot Password</Link>

            </div>
            <button className='w-full mt-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-md font-semibold hover:shadow-lg hover:scale-105 transition-all'>Sign In</button>

            </form>
        </div>
    );
}

export default LoginForm;
