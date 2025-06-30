import React from 'react';
import useEvents from '../../Hooks/useEvents';
import EventCard from './EventCard';

const Events = () => {
            const [events,isLoading,refetch] = useEvents();
    return (
        <div className='events_section common_padding  my-10'>
                <div className="events_cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                             events.map((event,index) => <EventCard key={index} event={event}></EventCard> )
                        }
                </div>
        </div>
    );
};

export default Events;