import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import ContactUs from '../components/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <ContactUs/>
        </div>
    );
};

export default Home;