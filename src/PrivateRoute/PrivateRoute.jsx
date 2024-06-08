import React from 'react';
import useAuth from '../CustomHooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user} = useAuth()
    const loaction = useLocation()
    if(user){
        return children;
    }
    return <Navigate state={loaction?.pathname} to={"/login"}/>
};

export default PrivateRoute;