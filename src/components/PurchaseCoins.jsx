import React from "react";
import { useNavigate } from "react-router";

const packages = [
  { id: "small", label: "100 Coins", coins: 100, amount: 1000, price: 10 },
  { id: "medium", label: "500 Coins", coins: 500, amount: 4500, price: 45 },
  { id: "large", label: "1000 Coins", coins: 1000, amount: 8000, price: 80 },
];

const PurchaseCoins = () => {
  const navigate = useNavigate();

  const handleBuy = (pkg) => {
    navigate(`/stripe?package=${pkg.id}`, { state: pkg });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Purchase Coins</h2>
        <p className="text-center text-gray-600 mb-6">
          Select a coin package, then continue to Stripe payment.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
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
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
