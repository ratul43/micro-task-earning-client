import React from 'react';
import HeroSection from './../components/sections/HeroSection';
import BestWorkers from './../components/sections/BestWorker';
import Features from './../components/sections/Features';
import HowItWorks from './../components/sections/HowItWorks';
import CallToAction from './../components/sections/CallToAction';
import Testimonials from './../components/sections/Testimonials';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <BestWorkers />
            <Testimonials />
            <Features />
            <HowItWorks />
            <CallToAction />
        </div>
    );
};

export default HomePage;