import React, { useState } from "react";
import { FaEdit, FaUsers } from "react-icons/fa";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Events_Edit_Modal from "./Events_Edit_Modal";

const MyEventsCard = ({ MyEvent, isLoading, refetch }) => {
  const {
    _id,
    eventTitle,
    name,
    email,
  eventDateTime,
    location,
    description,
    attendeeCount,
  } = MyEvent;

  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  // handle Loading State
  if (isLoading) {
    return <Loading></Loading>;
  }
  // get  local date and time 
  const eventDate =  new Date(eventDateTime).toLocaleDateString();
  const eventTime =  new Date(eventDateTime).toLocaleTimeString();

  // delete functin
  const handleDelete = async (id) => {
    try {
      //  show confirmation button with  sweet alert2
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/api/events/delete/${id}`);
          const result = res.data;

          if (result.acknowledged && result.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            refetch(); // refetch data
          }
        }
      });
    } catch (error) {
      toast.error("something is wrong");
    }
  };

  return (
    <div>
      {showModal ? (
        <>
          <Events_Edit_Modal
            MyEvent={MyEvent}
            setShowModal={setShowModal}
            refetch={refetch}
          ></Events_Edit_Modal>
        </>
      ) : (
        <>
          <div className="Event_card bg-white  text-black shadow-lg rounded-md px-4 py-8 border-1 border-sky-500 hover:bg-[#00A4EF] hover:text-white transition-all">
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

                {/* Date and time */}
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
              <p className="description  text-base mt-2 mb-6 overflow-hidden">
                {" "}
                {description}{" "}
              </p>
            </div>
            {/* card button */}
            <div className="card_button flex  gap-x-6 justify-end ">
              <Link
                className="primary_btn border flex justify-center items-center text-xl"
                onClick={() => setShowModal(true)}
              >
                {" "}
                <FaEdit></FaEdit>{" "}
              </Link>
              <Link
                className="btn flex justify-center items-center text-xl bg-red-400 text-black"
                onClick={() => handleDelete(_id)}
              >
                {" "}
                <MdDelete></MdDelete>{" "}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyEventsCard;
