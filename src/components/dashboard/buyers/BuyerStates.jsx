// BuyerStates.jsx
import React from "react";

const BuyerStates = () => {
  const stats = {
    totalTasks: 25,
    pendingTasks: 180, // sum of required_workers
    totalPayments: 950, // in coins or $ (your choice)
  };

  return (
    <div className="p-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">
        Buyer Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Tasks
            </h3>
            <span className="text-3xl">📋</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-blue-600">
            {stats.totalTasks}
          </p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Pending Workers
            </h3>
            <span className="text-3xl">⏳</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-yellow-500">
            {stats.pendingTasks}
          </p>
        </div>

        {/* Total Payments */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Payment
            </h3>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-green-600">
            {stats.totalPayments} Coins
          </p>
        </div>

      </div>
    </div>
  );
};

export default BuyerStates;