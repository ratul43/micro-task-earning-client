// Withdrawals.jsx
import React from "react";
import { useForm } from "react-hook-form";

const Withdrawals = () => {
  const { register, watch } = useForm();

  // Dummy user data
  const totalCoins = 300;

  const withdrawCoins = watch("withdraw_coin") || 0;

  // Conversion: 20 coins = 1$
  const withdrawAmount = (withdrawCoins / 20).toFixed(2);
  const totalAmount = (totalCoins / 20).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Withdraw Earnings</h2>

      {/* Earnings Info */}
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-lg font-semibold">
          Total Coins: <span className="text-blue-600">{totalCoins}</span>
        </p>
        <p className="text-md text-gray-600">
          Equivalent: ${totalAmount}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          (20 Coins = $1)
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        
        {/* Coin Input */}
        <div>
          <label className="block font-medium mb-1">
            Coin To Withdraw
          </label>
          <input
            type="number"
            placeholder="Enter coins"
            {...register("withdraw_coin")}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Withdraw Amount (Auto) */}
        <div>
          <label className="block font-medium mb-1">
            Withdraw Amount ($)
          </label>
          <input
            type="number"
            value={withdrawAmount}
            readOnly
            className="w-full border px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Payment System */}
        <div>
          <label className="block font-medium mb-1">
            Select Payment System
          </label>
          <select
            {...register("payment_system")}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select</option>
            <option value="stripe">Stripe</option>
            <option value="bkash">Bkash</option>
            <option value="rocket">Rocket</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium mb-1">
            Account Number
          </label>
          <input
            type="text"
            placeholder="Enter account number"
            {...register("account_number")}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Button / Condition */}
        {totalCoins >= 200 ? (
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Withdraw
          </button>
        ) : (
          <p className="text-red-500 text-center font-medium">
            Insufficient coin (Minimum 200 coins required)
          </p>
        )}
      </form>
    </div>
  );
};

export default Withdrawals;