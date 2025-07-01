import React from 'react';
import Home from '../Pages/HomePage/Home';
import  Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const Layout = () => {
    return (
        <div>
         <Navbar></Navbar>
                  
                            <Outlet></Outlet>

                            <Footer></Footer>
            
        </div>
    );
};

export default Layout;