import React, { useState } from "react";
import useEvents from "../../Hooks/useEvents";
import EventCard from "./EventCard";
import Loading from "../../Components/Loading";
import Event_Search_Filter from "./Event_Search_Filter";

const Events = () => {
  const [searchValue, setSearchValue] = useState("");
  const [events, isLoading, refetch] = useEvents(searchValue);

  

  

  if (isLoading) {
    return <Loading></Loading>;
  }

  // sort by desending order
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.eventDateTime) - new Date(a.eventDateTime)
  );

  return (
    <>
      {sortedEvents.length === 0 ? (
        <>
          <div className="w-full min-h-screen flex justify-center items-center text-xl text-gray-600">
            {" "}
            <p> No Events Here. Please Add Events</p>{" "}
          </div>
        </>
      ) : (
        <>
          <div className="events_section common_padding  my-10">
            {/*  search and filter events */}

            <Event_Search_Filter
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            ></Event_Search_Filter>

            <div className="events_cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedEvents.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  refetch={refetch}
                ></EventCard>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Events;
