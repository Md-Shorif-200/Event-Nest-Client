import axios from 'axios';
import React from 'react';

const userAxiosSecure = () => {
       const axiosSecure = axios.create({
         baseURL : 'http://localhost:5000/'
       })


    return axiosSecure;
};

export default userAxiosSecure;