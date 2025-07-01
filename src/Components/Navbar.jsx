import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { MdLogout } from 'react-icons/md';

const Navbar = () => {
    // nav list
    const navList = 
    <>
    
    <li>  <Link className='text-lg font-semibold capitalize mx-2' to='/'> home  </Link>  </li>
    <li>  <Link className='text-lg font-semibold capitalize mx-2' to='/events'> events  </Link>  </li>
    <li>  <Link className='text-lg font-semibold capitalize mx-2' to='/add-event'> add event </Link>  </li>
    <li>  <Link className='text-lg font-semibold capitalize mx-2' to='/my-events'> my  events </Link>  </li>
    </>

     const {user,logOut} = useAuth()  // context api

    
    return (
      <div className="navbar common_padding bg-white shadow-sm py-4 sticky top-0">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navList}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">eventNest</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
          {navList}
    </ul>
  </div>
  <div className="navbar-end">

             {
               user ? 
               
               <>
                      {/* user dropw-down menu */}
                 <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-xl  border-1 border-blue-500 btn-ghost btn-circle avatar">
                {/* user Image  */}
        <div className="w-20 rounded-full">
          <img
            alt="User Name"
            src={user?.photoURL} 
            //  className='w-[80px] h-[80px]'
             />

        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 w-[230px] rounded-box z-1 mt-3  pt-3 pb-6 shadow   ">
   
                  <li className='text-lg text-black font-semibold  px-4 py-2 inline-block  '> {user.displayName} </li>
                  <li onClick={logOut} className='px-4 pt-6 '> <Link className=' text-lg font-semibold flex  items-center gap-x-3'>  
                    <MdLogout></MdLogout>
                   log out
                   
                    </Link> </li>
      </ul>
    </div>
               </>
               :
               < >
              <div className='flex gap-x-6'>
                 <Link to='/log-in' className='primary_btn'>Log in </Link>
               <Link to='/sign-up' className='secondary_btn'>sign up </Link>
              </div>
               
               </>
             }
  </div>
</div>
    );
};

export default Navbar;

