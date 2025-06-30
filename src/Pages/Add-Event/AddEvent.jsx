import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import lottieImg from "../../assets/Animation - 1751260954539 (1).json";
import Lottie from "lottie-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useAuth(); // context api
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // events form submit
  const onsubmit = async (data) => {
    console.log(data);
    // event information
    const eventInfo = {
      eventTitle: data?.eventTitle,
      name: user?.displayName,
      email: user?.email,
      eventDate: data?.Date,
      eventTime: data?.time,
      location: data?.location,
      description: data?.description,
      attendeeCount: 0,
    };

    // send event Information to data base
    try {
      const response = await axiosSecure.post("/api/events", eventInfo);
      const result = response.data;
      if (result.acknowledged && result.insertedId) {
        toast.success("Event addition completed successfully.");
        reset(); // reset form

        setTimeout(() => {
          navigate("/my-events"); // navigate to my-events section
        }, 800);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen common_padding grid grid-cols-2 gap-6 pt-10">
      <div className="event_img_section w-full flex justify-center items-center ">
        <Lottie
          animationData={lottieImg}
          className="w-full sm:w-[80%]"
        ></Lottie>
      </div>
      <div className="events_form_section">
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          {/* event title */}
          <div>
            <label htmlFor="" className="block font-semibold capitalize">
              Title
            </label>
            <input
              type="text"
              {...register("eventTitle", {
                required: "Event Title is Required",
              })}
              className="w-full px-3 py-2  "
              placeholder="Enter Event Title "
            />

            {errors.eventTitle && (
              <p className="form_error">{errors.eventTitle.message} </p>
            )}
          </div>

          {/* name */}
          <div>
            <label htmlFor="" className="block font-semibold capitalize">
              Name
            </label>
            <input
              type="text"
              {...register("userName")}
              className="w-full px-3 py-2  "
              value={user?.displayName}
            />

            {errors.userName && (
              <p className="form_error">{errors.userName.message} </p>
            )}
          </div>

          {/* date and Time */}
          <div className="w-ful date_&_time flex gap-x-3">
            {/* date */}

            <div className="date w-full">
              <label htmlFor="" className="block font-semibold capitalize">
                date
              </label>
              <input
                type="date"
                {...register("Date", { required: "date is Required" })}
                className=" input w-full px-3 py-2  "
              />

              {errors.Date && (
                <p className="form_error">{errors.Date.message} </p>
              )}
            </div>
            {/* time */}
            <div className="time w-full">
              <label htmlFor="" className="block font-semibold capitalize">
                Time
              </label>
              <input
                type="time"
                {...register("time", { required: "time is Required" })}
                className=" input w-full px-3 py-2  "
              />

              {errors.time && (
                <p className="form_error">{errors.time.message} </p>
              )}
            </div>
          </div>

          {/* location */}
          <div>
            <label htmlFor="" className="block font-semibold capitalize">
              Location
            </label>
            <input
              type="text"
              {...register("location", { required: "Locatoin is Required" })}
              className="w-full px-3 py-2  "
              placeholder="Enter Event Location "
            />

            {errors.location && (
              <p className="form_error">{errors.location.message} </p>
            )}
          </div>

          {/* description  */}
          <div>
            <label htmlFor="" className="block font-semibold capitalize">
              Description
            </label>
            <textarea
              type="text"
              {...register("description", {
                required: "description is Required",
              })}
              className="textarea w-full px-3 py-2  "
              placeholder="Enter Event description "
            />

            {errors.description && (
              <p className="form_error">{errors.description.message} </p>
            )}
          </div>

          {/* submit button */}

          <button
            type="submit"
            className="primary_btn w-full mt-3 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
