import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { apiFetch } from "../apiService";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserDataContext";

const packages = [
  { id: "small", label: "10 Coins", coins: 10, amount: 100, price: 1 },
  { id: "medium", label: "150 Coins", coins: 150, amount: 1000, price: 10 },
  { id: "large", label: "500 Coins", coins: 500, amount: 2000, price: 20 },
  { id: "xlarge", label: "1000 Coins", coins: 1000, amount: 3500, price: 35 },
];

const PurchaseCoins = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const { fetchUserData } = useContext(UserDataContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const canceled = searchParams.get("canceled");

    if (canceled) {
      setError("Payment was canceled. Please try again.");
      return;
    }

    if (!sessionId) return;
    if (!user?.email) {
      setError("You must be logged in to complete the purchase.");
      return;
    }

    const confirmPayment = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await apiFetch("/payments/complete", {
          method: "POST",
          body: JSON.stringify({
            sessionId,
            email: user.email,
          }),
        });

        if (response?.success) {
          setSuccessMessage(`Payment confirmed! Your balance is now ${response.coins} coins.`);
          await fetchUserData();
          navigate("/purchase-coins", { replace: true });
        } else {
          throw new Error(response?.error || "Payment confirmation failed.");
        }
      } catch (err) {
        setError(err.message || "Payment confirmation failed.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, user?.email, fetchUserData, navigate]);

  const handleBuy = (pkg) => {
    navigate(`/stripe?package=${pkg.id}`, { state: pkg });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-5xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Purchase Coins</h2>
        <p className="text-center text-gray-600 mb-6">
          Select a coin package, then continue to Stripe payment.
        </p>

        {loading && (
          <div className="mb-4 rounded-lg bg-blue-50 p-4 text-blue-700">
            Processing payment confirmation... please wait.
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-xl p-5 bg-slate-50 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{pkg.label}</h3>
              <p className="text-gray-600 mb-4">${pkg.price}</p>
              <button
                type="button"
                onClick={() => handleBuy(pkg)}
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Buy now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoins;
