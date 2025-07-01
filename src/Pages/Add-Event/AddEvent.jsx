import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import lottieImg from "../../assets/Animation - 1751260954539 (1).json";
import Lottie from "lottie-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";

const AddEvent = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useAuth(); // context api
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [eventDateTime,setEventDateTime] = useState('');

   useEffect(() => {
       setValue('date_time',setEventDateTime)
   },[setEventDateTime,setValue])

 
   

  // events form submit
  const onsubmit = async (data) => {
    console.log(data);
    // event information
    const eventInfo = {
      eventTitle: data?.eventTitle,
      name: user?.displayName,
      email: user?.email,
      eventDateTime : new Date(eventDateTime),
      location: data?.location,
      description: data?.description,
      attendeeCount: 0,
      attendeeBy : []
    };


      console.log(typeof(eventDateTime));
      
    

    // send event Information to data base
    try {
      const response = await axiosSecure.post("/api/events", eventInfo);
      const result = response.data;
      if (result.acknowledged && result.insertedId) {
        toast.success("Event addition completed successfully.",{
          position : 'top-left'
        });
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
    <div className="w-full min-h-screen common_padding flex flex-col-reverse lg:flex-row gap-6 pt-10">
      <div className="event_img_section  w-full lg:w-[50%] flex justify-center items-center ">
        <Lottie
          animationData={lottieImg}
          className="w-full sm:w-[80%]"
        ></Lottie>
      </div>
      <div className="events_form_section w-full lg:w-[50%]">
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
          <div className="w-full date_&_time  ">
    
              <label htmlFor="" className="block font-semibold capitalize">
                Date & Time
              </label>
                    {/* date picker */}
                   <div className="relative">
                            <FaCalendarAlt className="absolute top-7 right-7 text-xl"></FaCalendarAlt>
                      <DatePicker 
                     selected={eventDateTime}
                     onChange={setEventDateTime}
                     showTimeSelect
                     timeFormat="h:mm aa"
                     timeIntervals={15}
                     dateFormat="MMMM d, yyyy h:mm aa"
                     className=' '
                     placeholder= 'select data & time'
                     >

                     </DatePicker>
                   </div>
              <input
                type="hidden"
                {...register("date_time", { required: "this field is Required" })}
                className=" "
              />

              {errors.date_time && (
                <p className="form_error">{errors.date_time.message} </p>
              )}
      
          
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
