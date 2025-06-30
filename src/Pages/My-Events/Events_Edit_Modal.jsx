import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel, MdClose } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Events_Edit_Modal = ({ MyEvent, setShowModal, refetch }) => {
  const {
    _id,
    eventTitle,
    name,
    email,
    eventDate,
    eventTime,
    location,
    description,
    attendeeCount,
  } = MyEvent; // my event data

  //   react hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); //  private api

  // My Events Data
  const [title, setTitle] = useState(eventTitle);
  const [date, setDate] = useState(eventDate);
  const [time, setTime] = useState(eventTime);
  const [eventLoacation, setEventLocation] = useState(location);
  const [eventDescription, setEventDescription] = useState(description);

  //   handle modal form
  const onsubmit = async (data) => {
    const updatedEventData = {
      userEmal: user?.email,
      title: title,
      date: date,
      time: time,
      eventLoacation: eventLoacation,
      eventDescription: eventDescription,
    };

    // update event data
    try {
      const res = await axiosSecure.patch(
        `/api/events/update/${_id}`,
        updatedEventData
      );
      const result = res.data;
      if (result.acknowledged && result.modifiedCount > 0) {
        toast.success("Data Updated Succesfully");
        reset(); // reset form
        refetch(); // refetch data
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="w-full min-h-screen fixed inset-0 bg-black/80 flex justify-center items-center z-30 py-10">
      <div className=" w-[90%]  sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-auto bg-white shadow-md text-black p-8 rounded-xl z-40 relative">
        <div className="Modal_form_section events_form_section">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {errors.eventTitle && (
                <p className="form_error">{errors.eventTitle.message} </p>
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                value={eventLoacation}
                onChange={(e) => setEventLocation(e.target.value)}
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
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
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

        {/* mocal close button */}
        <div
          className="modal_close_icon absolute top-3 right-3 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <MdClose className="text-4xl"></MdClose>
        </div>
      </div>
    </div>
  );
};

export default Events_Edit_Modal;
