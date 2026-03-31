// Features.jsx
import React from "react";

const features = [
  { title: "Flexible Tasks", desc: "Choose tasks that fit your schedule", icon: "🕒" },
  { title: "Instant Rewards", desc: "Get coins immediately after approval", icon: "💰" },
  { title: "Skill Growth", desc: "Improve your skills with each task", icon: "📈" },
];

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-blue-50 p-6 rounded-lg shadow-md text-center hover:scale-105 transition">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;