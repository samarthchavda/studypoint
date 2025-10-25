import React from "react";
import { useForm } from "react-hook-form";
import { countrycode } from "../../data/countrycode";
import { sendContactReq } from "../../services/operations/contactUsApi";
const ContactForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const submitHandler =async (data) => {
    data={
        ...data,
        phoneNumber:`${data.countryCode}${data.phoneNumber}`
    }
    try {
        await sendContactReq(data);
        reset();
    } catch (error) {
        console.log("error in submit handler",error);
    }

  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className=" max-w-[600px]  mx-auto flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex gap-[6px] sm:w-1/2 flex-col">
          <label htmlFor="fName" className="text-richblack-5">
            First Name
          </label>
          <input
            className="field"
            placeholder="Enter First Name"
            type="text"
            name="fName"
            id="fName"
            {...register("firstName", {
              required: { value: true, message: "First Name is empty" },
            })}
          />
          {errors.fName && (
            <p className="text-red-600">{errors.fName.message}</p>
          )}
        </div>

        <div className="flex gap-[6px] sm:w-1/2 flex-col">
          <label htmlFor="lName" className="text-richblack-5">
            Last Name
          </label>
          <input
            className="field"
            placeholder="Enter Last Name"
            type="text"
            name="lName"
            id="lName"
            {...register("lastName", {
              required: { value: true, message: "Last Name is empty" },
            })}
          />
          {errors.lName && (
            <p className="text-red-600">{errors.lName.message}</p>
          )}
        </div>
        </div>

        <div className="flex gap-[6px] flex-col">
          <label htmlFor="email" className="text-richblack-5">
            Email address
          </label>
          <input
            className="field"
            placeholder="Enter email address"
            type="email"
            name="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email is empty" },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex gap-[6px] flex-col">

        <label htmlFor="phoneNumber" className="text-richblack-5">
            Phone Number
          </label>
            <div className="flex gap-5">
            <select
            className="field w-1/4"
            {...register("countryCode")}
            name="countryCode"
            id="countryCode"
          >
            {countrycode.map((item, index) => {
              return item.code === "+91" ? (
                <option className="field" selected value={item.code}>
                  {item.code} {item.country}
                </option>
              ) : (
                <option className="field" value={item.code}>
                  {item.code} {item.country}
                </option>
              );
            })}
          </select>
         

          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: { value: true, message: "Phone Number is Empty" },
            //   minLength:{value:10,message:"Phone Number is short"},
            //   maxLength: { value: 10, message: "Phone Number is short" },
              pattern:{value:/^[0-9]{10}$/,message:"invalid phone number"}
            })}
            className="field w-3/4"
          />
            </div>
            {errors.phoneNumber && (
            <p className="text-red-600">{errors.phoneNumber.message}</p>
          )}

         
        </div>
        
        <div className="flex gap-[6px] flex-col">
        <label htmlFor="message" className="text-richblack-5">
           Message
          </label>        <textarea name="message" id="message" className="field"
        {...register("message",{required:{value:true,message:"message field is empty"}})}
        rows={10} cols={10}></textarea>
        </div>
        {errors.message && (
            <p className="text-red-600">{errors.message.message}</p>
          )}

        <button type="submit" className="bg-[#FFD60A] rounded-lg font-medium p-3">Send Message</button>

    </form>
  );
};

export default ContactForm;
