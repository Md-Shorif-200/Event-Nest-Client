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
                element : <AddEvent></AddEvent>
       },
       {
        path : '/events',
        element  : <Events></Events>
       }

    ]
  },
]);

export default Router;