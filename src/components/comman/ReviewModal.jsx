import React, { useEffect, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Label from "./Label";
import ReactStars from "react-stars";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import SubmitBtn from "./SubmitBtn";
import { addRating } from "../../services/operations/courseApi";
import { useParams } from "react-router-dom";
import YellowBtn from "./YellowBtn";
const ReviewModal = ({ modalRef, disappearHandler }) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.profile.user);
  const { token } = useSelector((state) => state.auth);

  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(false);
  var rating = null;
  useOnClickOutside(modalRef, disappearHandler);
  const submitHandler = (data) => {
    if (rating === null) {
      toast.error("forget to give rating!");
      return;
    }
    addRating(
      token,
      rating,
      data.review,
      courseId,
      setLoading,
      disappearHandler
    );
  };
  const ratingChangeHandler = (newRating) => {
    rating = newRating;
  };
  return (
    <div ref={modalRef} className="flex flex-col">
      <h3 className="flex font-semibold bg-richblack-700 rounded-t-lg py-4 border-b-[1px] border-richblack-25 px-6 text-richblack-5 justify-between items-center">
        Add Review{" "}
        <span className="cursor-pointer" onClick={disappearHandler}>
          {" "}
          <RxCross2 className="text-richblack-50 h-5" />
        </span>
      </h3>
      <div className="flex rounded-b-lg bg-richblack-800 py-4 flex-col items-center">
        <div className="flex gap-3">
          <img
            className="h-[52px] rounded-full"
            src={user?.image}
            alt="profile picture"
          />
          <div>
            <p className="text-richblack-5 font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-5">Posting Publicly </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 px-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <ReactStars
            className="self-center"
            size={36}
            onChange={ratingChangeHandler}
          />

          <div className="flex flex-col gap-2">
            <Label
              text={"Add Your Experience"}
              required={true}
              forwhat={"review"}
            />
            <textarea
              {...register("review", {
                required: {
                  value: true,
                  message: "your review is necessary",
                },
              })}
              placeholder="share details of your own experience for this course"
              cols={width>500?45:width>300?30:15}
              rows={5}
              name="review"
              id="review"
              className="text-richblack-200 outline-none p-2 shadow-[0px_1px_1px_#FFFFFF] font-medium bg-richblack-600 rounded-lg"
            ></textarea>
          </div>
          {errors.review && <ErrorMessage message={errors.review.message} />}
          <div className="flex justify-end gap-3">
            <YellowBtn
              text={"Cancel"}
              clickHandler={disappearHandler}
              bgColour={"#2C333F"}
              textColour={"#F1F2FF"}
            />
            <SubmitBtn text={"Save Edits"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
