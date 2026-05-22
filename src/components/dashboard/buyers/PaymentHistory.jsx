import React, { useEffect, useState, useContext } from "react";
import { apiFetch } from "../../../apiService";
import { AuthContext } from "../../../context/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.email) return;
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch(`/payments?email=${encodeURIComponent(user.email)}`);
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [user?.email]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : payments.length === 0 ? (
        <div>No payments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Coins</th>
                <th className="py-2 px-4 text-left">Amount ($)</th>
                <th className="py-2 px-4 text-left">Payment ID</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{p.timestamp ? new Date(p.timestamp).toLocaleString() : "-"}</td>
                  <td className="py-2 px-4">{p.coins}</td>
                  <td className="py-2 px-4">{p.amount}</td>
                  <td className="py-2 px-4">{p.paymentIntentId?.slice(-8) || "-"}</td>
                  <td className="py-2 px-4">{p.status || "completed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
