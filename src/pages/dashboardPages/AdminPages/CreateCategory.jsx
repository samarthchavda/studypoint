import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/courseSlice";
import { getAllCategory } from "../../../services/operations/CategoryApi";
import Spinner from "../../../components/comman/Spinner";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/comman/ErrorMessage";
import Label from "../../../components/comman/Label";
import SubmitBtn from "../../../components/comman/SubmitBtn";
import { createCategory } from "../../../services/operations/adminapi";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.course.loading);
    const {handleSubmit,register,formState:{errors}}=useForm();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory(dispatch, setLoading);
        setCategories(response.data.categories);
      } catch (error) {
        console.log("error while fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const submitHandler=async(data)=>{
    const response=await createCategory(token,data.name,data.description,dispatch,setLoading);
    if(response){
        setCategories([...categories,response?.category]);
    }
  }

  return loading 
  ? <Spinner />
   : <div className="flex flex-col-reverse md:flex-row-reverse gap-10  pl-6 pt-6">
    <div className="flex flex-col gap-4 w-3/4 md:w-1/2 text-start">
        <h1 className="text-2xl font-semibold text-richblack-5">Categories</h1>
        <ul className="flex flex-col gap-2">
            {
               categories?.length >0 ? categories?.map((category)=>{
                       return <li key={category?._id} className="flex flex-col gap-[2px]">
                            <h2 className="text-richblack-25">{category?.name}</h2>
                            {/* <p className="text-sm text-richblack-50">{category?.description}</p> */}
                        </li>
                }) : null
            }
        </ul>
    </div>
    <form className="flex w-3/4 md:w-1/2  flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-2xl font-semibold text-richblack-5">Create New Scope</h2>
        <div className="flex flex-col gap-1">
 <Label text={"Enter Category Name"} forwhat={"name"} required={true}/>
        <input id="name"  className="field" type="text" {...register("name",{required:{value:true,message:"category name is required"}})} />
        {
            errors.name && <ErrorMessage message={errors.name.message}/>
        }
        </div>
       
       <div className="flex flex-col gap-1">
        <Label text={"Enter Category Description"} forwhat={"description"} required={true}/>
         <input id="description" className="field" type="text" {...register("description",{required:{value:true,message:"category description name is required"}})} />
        {
            errors.description && <ErrorMessage message={errors.description.message}/>
        }
       </div>
       <div  className="self-end">
         <SubmitBtn text={"Create Category"}/>
       </div>
    </form >
   </div>;
};

export default CreateCategory;
