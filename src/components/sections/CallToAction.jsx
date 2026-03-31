// CallToAction.jsx
import React from "react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
        Ready to Start Earning Today?
      </h2>
      <p className="text-lg md:text-2xl mb-8 animate-fadeIn">
        Join thousands of users completing tasks and earning coins.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
          Sign Up Now
        </button>
        <button className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default CallToAction;