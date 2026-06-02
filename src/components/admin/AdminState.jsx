import React, { useEffect, useState } from "react";
import { apiFetch } from "../../apiService";

const AdminState = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, withdrawals] = await Promise.all([
          apiFetch("/users"),
          apiFetch("/withdrawal"),
        ]);

        const totalWorkers = users.filter(
          (user) => user.role === "worker",
        ).length;
        const totalBuyers = users.filter((user) => user.role === "buyer").length;
        const totalCoins = users.reduce(
          (sum, user) => sum + (Number(user.coins) || 0),
          0,
        );
        const totalPayments = withdrawals
          .filter((withdrawal) => withdrawal.status === "approved")
          .reduce(
            (sum, withdrawal) =>
              sum + (Number(withdrawal.withdrawal_amount) || 0),
            0,
          );

        setStats({ totalWorkers, totalBuyers, totalCoins, totalPayments });
      } catch (err) {
        console.error(err);
        setError("Unable to load admin stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard Overview
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading stats...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
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
      )}
    </div>
  );
};

export default AdminState;