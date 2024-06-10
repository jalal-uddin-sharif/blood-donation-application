import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from '../Home/Footer';

const Roots = () => {
    return (
        <div>
            <div className='lg:max-w-5xl lg:mt-1 xl:max-w-6xl mx-auto'>

            <Navbar/>
            <Outlet/>
            </div>
            <Toaster/>
            <Footer/>
        </div>
    );
};

export default Roots;