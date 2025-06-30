import React from 'react';
import useEvents from '../../Hooks/useEvents';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Components/Loading';
import MyEventsCard from './MyEventsCard';

const MyEvents = () => {
        const {user} = useAuth();
       const [events,isLoading,refetch] = useEvents();

       const my_evetns = events.filter(event => event?.email === user?.email);
        console.log(my_evetns);

        if(isLoading){

            return <Loading></Loading>
        }
        
    return (
     <div className='common_padding my-10'>
           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {
                 my_evetns.map((MyEvent,index) => <MyEventsCard key={index} MyEvent={MyEvent}></MyEventsCard> )
            }
            
        </div>
     </div>
    );
};

export default MyEvents;