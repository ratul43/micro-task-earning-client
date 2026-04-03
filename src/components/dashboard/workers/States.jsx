// WorkerStats.jsx
import React from "react";

const WorkerStats = () => {
  const stats = {
    totalSubmissions: 120,
    pendingSubmissions: 25,
    totalEarnings: 850,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Total Submissions */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Total Submissions
          </h3>
          <span className="text-3xl">📄</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-blue-600">
          {stats.totalSubmissions}
        </p>
      </div>

      {/* Pending Submissions */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Pending Submissions
          </h3>
          <span className="text-3xl">⏳</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-yellow-500">
          {stats.pendingSubmissions}
        </p>
      </div>

      {/* Total Earnings */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Total Earnings
          </h3>
          <span className="text-3xl">💰</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-green-600">
          {stats.totalEarnings} Coins
        </p>
      </div>

    </div>
  );
};

export default WorkerStats;