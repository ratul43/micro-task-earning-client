// BestWorkers.jsx
import React from "react";

const workers = [
  { name: "Alice", coins: 1200, img: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob", coins: 1100, img: "https://i.pravatar.cc/150?img=2" },
  { name: "Charlie", coins: 1000, img: "https://i.pravatar.cc/150?img=3" },
  { name: "Daisy", coins: 950, img: "https://i.pravatar.cc/150?img=4" },
  { name: "Ethan", coins: 900, img: "https://i.pravatar.cc/150?img=5" },
  { name: "Fiona", coins: 850, img: "https://i.pravatar.cc/150?img=6" },
];

const BestWorkers = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Top Workers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {workers.map((worker, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-md text-center hover:scale-105 transition">
              <img
                src={worker.img}
                alt={worker.name}
                className="w-20 h-20 mx-auto rounded-full mb-2"
              />
              <h3 className="font-semibold">{worker.name}</h3>
              <p className="text-sm text-gray-500">{worker.coins} Coins</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;