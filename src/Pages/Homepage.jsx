import React from 'react';
import WeeklySpecials from '../components/WeeklySpecials/WeeklySpecials';
import AboutUs from '../components/About/AboutUs';
import CustomerTestimonials from '../components/CustomerTestimonials/CustomerTestimonials';

function Homepage() {
    return (
        <>
            <WeeklySpecials/>
            <AboutUs id="about-us"/>
            <CustomerTestimonials />
        </>
    )
}

export default Homepage;