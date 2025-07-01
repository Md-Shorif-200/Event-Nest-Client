import React from 'react';
import useEvents from '../../Hooks/useEvents';
import EventCard from '../Events/EventCard';

const Home_Events = () => {

     const [events, isLoading, refetch] = useEvents()
            const HomeEvents = events?.slice(0,8)
    return (
        <div className='common_padding my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

            {
                        HomeEvents.map(data => <EventCard key={data?._id} event={data}></EventCard>)
            }
            
        </div>
    );
};

export default Home_Events;