// Testimonials.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const testimonials = [
  { name: "Alice", quote: "This platform helped me earn my first coins!", img: "https://i.pravatar.cc/150?img=11" },
  { name: "Bob", quote: "Tasks are easy and fun!", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Charlie", quote: "I love the flexibility and payment system.", img: "https://i.pravatar.cc/150?img=13" },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <Swiper spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 4000 }}>
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
                <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full" />
                <p className="text-gray-700 italic">"{t.quote}"</p>
                <h3 className="font-semibold">{t.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;