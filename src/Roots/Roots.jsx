import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from '../Home/Footer';

const Roots = () => {
    return (
        <div className="min-h-screen">
            <div className='mx-auto px-4 lg:mt-1 lg:max-w-5xl xl:max-w-6xl'>

            <Navbar/>
            <Outlet/>
            </div>
            <Toaster/>
            <Footer/>
        </div>
    );
};

export default Roots;
