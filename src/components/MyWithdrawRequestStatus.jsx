import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../apiService";
import { toast } from "react-toastify";

const MyWithdrawRequestStatus = () => {
  const { user } = useContext(AuthContext);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchWithdrawalStatus = async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/withdrawal");
        const myRequests = data.filter((item) => item.worker_email === user.email);
        setWithdrawals(myRequests);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load withdrawal requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawalStatus();
  }, [user?.email]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        My Withdrawal Requests
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Coins
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Method
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : withdrawals.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-600">
                  No withdrawal requests found.
                </td>
              </tr>
            ) : (
              withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {withdrawal.worker_name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {withdrawal.worker_email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {withdrawal.withdrawal_coin}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    ${withdrawal.withdrawal_amount}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 capitalize">
                    {withdrawal.payment_system}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(withdrawal.withdraw_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        withdrawal.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : withdrawal.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWithdrawRequestStatus;
