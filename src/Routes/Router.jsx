import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from '../Pages/ErrorPage';
import Layout from '../Layout/Layout';
import Home from '../Pages/HomePage/Home';
import LogIn from '../Pages/AuthPage/LogIn';
import SignUp from '../Pages/AuthPage/SignUp';
import AddEvent from '../Pages/Add-Event/AddEvent';
import Events from '../Pages/Events/Events';
import MyEvents from '../Pages/My-Events/MyEvents';
import PrivateRoute from './PrivateRoute';



const Router = createBrowserRouter([
  {
    path: "/",
    errorElement : <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    children : [
       {
         path : '/',
         element : <Home></Home>
       },
       {
        path : '/log-in',
          element : <LogIn></LogIn>
       },
       {
        path : '/sign-up',
        element : <SignUp></SignUp>
       },
       {
              path : '/add-event',
                element : <PrivateRoute> <AddEvent></AddEvent></PrivateRoute>
       },
       {
        path : '/events',
        element  :  <PrivateRoute><Events></Events></PrivateRoute>
       },
       {
        path : '/my-events',
        element : <PrivateRoute><MyEvents></MyEvents></PrivateRoute>
       }

    ]
  },
]);

export default Router;