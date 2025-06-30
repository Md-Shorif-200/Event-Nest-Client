import React from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const EventCard = ({ event ,refetch }) => {
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
    attendeeBy
  } = event;

  const axiosSecure = useAxiosSecure() // private api
  const {user} = useAuth();


  // join event function
  const handleJoinEventBtn = async(id) => {
         const  data = {
            email  : user?.email
         }

         try {
              const res = await axiosSecure.patch(`/api/events/update/${id}`,data)
               const result = res.data;
               if(result.acknowledged && result.modifiedCount > 0) {
                   toast.success('You have successfully joined the event');
                   refetch() ; // refetch data
               }
              
         } catch (error) {
            toast.error('You are already attending the event.')
         }
  }







  return (
    <div className="Event_card max-h-[300px] bg-white  text-black shadow-lg rounded-md px-4 py-8 border-1 border-sky-500  hover:scale-105 transition-all">
      {/* card heading */}
      <div className="card_heading flex justify-between">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">
          {" "}
          {eventTitle.slice(0, 30)}{" "}
        </h1>
        <div
          className="flex items-center gap-x-3 text-2xl"
          title="Attendee Count"
        >
          <FaUsers className=" card_icon text-sky-500"></FaUsers>
          <p> {attendeeCount} </p>
        </div>
      </div>
      {/* card_para */}
      <div className="card_para">
        <div className="date_time  flex justify-between items-center mt-4 mb-2">
          <div className="date flex gap-x-1  items-center">
            <p className="text-base  md:text-lg font-semibold capitalize">
              {" "}
              date :{" "}
            </p>
            <p className="text-base  md:text-lg "> {eventDate} </p>
          </div>
          <div className="time">
            <p className="text-base md:text-lg"> {eventTime} </p>
          </div>
        </div>
        <p className="location text-base md:text-lg font-semibold">
          {" "}
          Location : <span className="font-normal">{location} </span>{" "}
        </p>
        <p className="description  text-base mt-2 mb-6">
          {" "}
          {description}{" "}
        </p>
      </div>
      {/* card button */}
      <div className="card_button flex justify-end">
        <button className={`${attendeeBy?.includes(email) ? 'btn' : 'primary_btn'}`} onClick={() => handleJoinEventBtn(_id)} > Join Event </button>
      </div>
    </div>
  );
};

export default EventCard;
