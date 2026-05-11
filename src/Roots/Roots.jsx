import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from '../Home/Footer';

const Roots = () => {
    return (
        <div className="min-h-screen">
            <div className='app-container'>
                <Navbar/>
                <Outlet/>
            </div>
            <Toaster/>
            <Footer/>
        </div>
    );
};

export default Roots;
