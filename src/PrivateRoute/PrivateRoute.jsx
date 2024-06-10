import React from 'react';
import useAuth from '../CustomHooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const loaction = useLocation()
    if(user){
        return children;
    }
    if(loading){
        return <Loader/>
    }
    return <Navigate state={loaction?.pathname} to={"/login"}/>
};

export default PrivateRoute;