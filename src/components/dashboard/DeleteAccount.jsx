import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../services/operations/profileApi';
import ConfirmationModal from '../comman/ConfirmationModal';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { LoadingContext } from '../../pages/dashboardPages/DashBoard';
const DeleteAccount = () => {
    const {loading,setLoading}=useContext(LoadingContext);
    const navigate=useNavigate();
    const [confirmationModal,setConfirmationModal]=React.useState(false);
      const { token } = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const modalRef=React.useRef(null);
    const clickHandler=(e)=>{
        dispatch(deleteAccount(token,navigate,setLoading));
    }
    useOnClickOutside(modalRef,()=>{setConfirmationModal(false)});
    return (
        <div className='bg-[#340019] rounded-lg p-6 mt-10 max-w-[800px] border lg:ml-20 mx-3 md:mr-32 lg:mr-64 border-[#691432] flex gap-4 '>
            <div className='bg-[#691432] p-4 rounded-full h-fit w-fit flex justify-center items-center'>
            <RiDeleteBinLine className='w-5 h-6 text-[#EF476F]' />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <h3 className='text-lg font-bold text-richblack-5'>Delete Account</h3>
                <p className='text-[#FBC7D1] font-medium'>Would you like to delete account?</p>
                <p className='text-[#FBC7D1] font-medium'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                <button onClick={()=>{setConfirmationModal(true)}} className='text-[#D43D63] italic font-medium self-start'>I want to delete my account.</button>
            </div>
            {
                confirmationModal && <ConfirmationModal
                    btn1Text={'Cancel'}
                    btn2Text={'Delete'}
                    heading={' your account'}
                    modalRef={modalRef}
                    btn1Handler={()=>{setConfirmationModal(false)}}
                    btn2Handler={clickHandler}
                />
            }
        </div>
    );
}

export default DeleteAccount;
