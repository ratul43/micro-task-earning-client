// HeroSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "Earn While You Work",
      subtitle: "Complete micro tasks and get rewarded instantly",
      bgColor: "from-violet-600 via-indigo-600 to-blue-600",
      accentColor: "bg-white text-indigo-600",
    },
    {
      id: 2,
      title: "Flexible Work, Flexible Life",
      subtitle: "Work from anywhere, anytime",
      bgColor: "from-emerald-600 via-teal-600 to-cyan-600",
      accentColor: "bg-white text-teal-600",
    },
    {
      id: 3,
      title: "Grow Your Skills",
      subtitle: "Learn, earn, and showcase your talent",
      bgColor: "from-purple-600 via-fuchsia-600 to-pink-600",
      accentColor: "bg-white text-purple-600",
    },
  ];

  return (
    <section className="relative h-[560px] md:h-[680px] overflow-hidden z-0">   {/* ← Critical Fix */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={900}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-bullet",
          bulletActiveClass: "swiper-bullet-active",
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative h-full bg-gradient-to-br ${slide.bgColor} flex items-center justify-center`}
            >
              {/* Background Overlay Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff10_0%,transparent_50%)]" />

              {/* Main Content */}
              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Live Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-white tracking-widest">
                    NOW LIVE
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter mb-6 animate-fade-in">
                  {slide.title}
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-black/30 ${slide.accentColor}`}
                  >
                    Start Earning Now
                  </button>
                  <button className="px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-white/80 text-white hover:bg-white/10 hover:border-white transition-all duration-300">
                    Watch How It Works
                  </button>
                </div>
              </div>

              {/* Decorative Floating Element */}
              <div className="absolute bottom-12 right-10 hidden lg:block z-0">
                <div className="w-28 h-28 bg-white/10 backdrop-blur-2xl rounded-3xl rotate-12 flex items-center justify-center border border-white/20 shadow-inner">
                  <span className="text-5xl">💰</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination - Lower z-index than navbar */}
      <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/70 text-sm z-10 pointer-events-none">
        <span className="mb-1">Scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;