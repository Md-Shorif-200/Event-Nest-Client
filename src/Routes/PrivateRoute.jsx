import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {

    const {user,loading} = useAuth();
    const location = useLocation();

    if(user){
        return children;
    }

    if(loading){
         return <Loading></Loading>
    }

    return <Navigate to='/log-in' state={{from : location}} replace></Navigate>
};

export default PrivateRoute;
