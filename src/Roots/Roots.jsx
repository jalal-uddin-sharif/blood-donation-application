import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';

const Roots = () => {
    return (
        <div>
            <div className='max-w-screen-xl mx-auto'>

            <Navbar/>
            <Outlet/>
            </div>
        </div>
    );
};

export default Roots;