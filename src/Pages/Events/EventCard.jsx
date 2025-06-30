import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventCard = ({event}) => {
      const {eventTitle,name,email,eventDate,eventTime,location,description,attendeeCount} = event;
    return (
        <div className='Event_card bg-white  text-black shadow-lg rounded-md px-4 py-8 border-1 border-sky-500 hover:bg-[#00A4EF] hover:text-white transition-all'>
                        {/* card heading */}
             <div className="card_heading flex justify-between">
                  <h1 className='text-xl md:text-2xl font-semibold capitalize'> {eventTitle.slice(0,30)} </h1>
                   <div className='flex items-center gap-x-3 text-2xl'  title='Attendee Count'>
                            <FaUsers className=' card_icon text-sky-500'></FaUsers>
                             <p>  {attendeeCount} </p>
                       </div>
             </div>
                        {/* card_para */}
             <div className="card_para">
                   <div className="date_time  flex justify-between items-center mt-4 mb-2">
                        <div className="date flex gap-x-1  items-center">
                              <p className='text-base  md:text-lg font-semibold capitalize'> date : </p>
                              <p className='text-base  md:text-lg '> {eventDate} </p>
                        </div>
                        <div className="time">
                              <p className='text-base md:text-lg'> {eventTime} </p>
                        </div>
                   </div>
                   <p className="location text-base md:text-lg font-semibold">  Location :  <span className='font-normal'>{location} </span> </p>
                   <p className="description  text-base mt-2 mb-6">  {description.slice(0,50)} </p>
             </div>
                    {/* card button */}
             <div className="card_button flex justify-end">
                            <Link className='primary_btn '> Joint Event </Link>
             </div> 
      
        </div>
    );
};

export default EventCard;