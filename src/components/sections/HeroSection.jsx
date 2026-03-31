// HeroSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-gray-100">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div className="h-[500px] md:h-[600px] bg-blue-600 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold animate-fadeIn">
              Earn While You Work
            </h1>
            <p className="mt-4 text-lg md:text-2xl animate-fadeIn">
              Complete micro tasks and get rewarded instantly
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[500px] md:h-[600px] bg-green-600 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold animate-fadeIn">
              Flexible Work, Flexible Life
            </h1>
            <p className="mt-4 text-lg md:text-2xl animate-fadeIn">
              Work from anywhere, anytime
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[500px] md:h-[600px] bg-purple-600 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold animate-fadeIn">
              Grow Your Skills
            </h1>
            <p className="mt-4 text-lg md:text-2xl animate-fadeIn">
              Learn, earn, and showcase your talent
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSection;