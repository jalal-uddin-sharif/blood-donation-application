import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Roots = () => {
    return (
        <div>
            <div className='max-w-screen-xl mx-auto'>

            <Navbar/>
            <Outlet/>
            </div>
            <Toaster/>
        </div>
    );
};

export default Roots;