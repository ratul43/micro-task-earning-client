// HowItWorks.jsx
import React from "react";

const steps = [
  { step: "1", title: "Sign Up", desc: "Create your account and set up your profile" },
  { step: "2", title: "Choose Tasks", desc: "Browse tasks and select what you like" },
  { step: "3", title: "Complete & Earn", desc: "Submit work and get coins instantly" },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex-1 hover:scale-105 transition">
              <div className="text-4xl font-bold text-blue-600 mb-4">{s.step}</div>
              <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;