import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../../apiService";

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/withdrawal");
      setWithdrawals(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load withdrawal requests");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (withdrawal) => {
    setApproving(withdrawal._id);

    try {
      // Update withdrawal status to approved
      await apiFetch(`/withdrawal/${withdrawal._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "approved" }),
      });

      // Decrease user coins
      await apiFetch("/users", {
        method: "PUT",
        body: JSON.stringify({
          email: withdrawal.worker_email,
          coins: -withdrawal.withdrawal_coin,
        }),
      });

      toast.success("Payment approved! User coins updated.");

      setWithdrawals((prev) =>
        prev.map((item) =>
          item._id === withdrawal._id ? { ...item, status: "approved" } : item,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve payment. Please try again.");
    } finally {
      setApproving(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p>Loading withdrawal requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Withdraw Requests
      </h2>

      {/* Table */}
      {withdrawals.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No withdrawal requests found.</p>
      ) : (
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
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id} className="border-t">
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
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {withdrawal.payment_system}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(withdrawal.withdraw_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${withdrawal.status === "approved" ? "text-green-700 bg-green-100" : "text-yellow-700 bg-yellow-100"}`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {withdrawal.status === "approved" ? (
                      <button
                        disabled
                        className="px-3 py-1 text-sm text-white bg-gray-400 rounded cursor-not-allowed"
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePaymentSuccess(withdrawal)}
                        disabled={approving === withdrawal._id}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {approving === withdrawal._id
                          ? "Processing..."
                          : "Payment Success"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WithdrawRequest;
