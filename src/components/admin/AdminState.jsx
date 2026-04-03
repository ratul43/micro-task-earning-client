// AdminState.jsx
import React from "react";

const AdminState = () => {
  const stats = {
    totalWorkers: 1200,
    totalBuyers: 300,
    totalCoins: 50000,
    totalPayments: 2500, // in dollars
  };

  return (
    <div className="p-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Workers */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Workers
            </h3>
            <span className="text-3xl">👷</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-blue-600">
            {stats.totalWorkers}
          </p>
        </div>

        {/* Total Buyers */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Buyers
            </h3>
            <span className="text-3xl">🛒</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-purple-600">
            {stats.totalBuyers}
          </p>
        </div>

        {/* Total Coins */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Coins
            </h3>
            <span className="text-3xl">🪙</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-yellow-500">
            {stats.totalCoins}
          </p>
        </div>

        {/* Total Payments */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium">
              Total Payments
            </h3>
            <span className="text-3xl">💵</span>
          </div>
          <p className="text-3xl font-bold mt-4 text-green-600">
            ${stats.totalPayments}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminState;