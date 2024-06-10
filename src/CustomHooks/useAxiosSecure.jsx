import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import toast from 'react-hot-toast';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../Authentication/firebase.config';
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_SECRET,
 
})
const useAxiosSecure = () => {
    const auth = getAuth(app)
    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
       config.headers.authorization = `Bearer ${token}`;
       return config;
    }, function (error){
        return Promise.reject(error)
    })
    
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            // await signOut(auth);
            <Navigate to={'/'}/>
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;