import React from 'react';
import Home from '../Pages/HomePage/Home';
import  Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
         <Navbar></Navbar>
                    <Home></Home>
                            <Outlet></Outlet>
            
        </div>
    );
};

export default Layout;