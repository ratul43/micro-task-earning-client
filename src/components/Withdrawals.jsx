import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserDataContext";
import { apiFetch } from "../apiService";

const Withdrawals = () => {
  const { user } = useContext(AuthContext);
  const { userData, fetchUserData } = useContext(UserDataContext);
  const [withdrawCoin, setWithdrawCoin] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCoins = Number(userData?.coins ?? 0);
  const withdrawCoins = Number(withdrawCoin) || 0;
  const withdrawAmount =
    withdrawCoins > 0 ? (withdrawCoins / 20).toFixed(2) : "0.00";
  const totalAmount = (totalCoins / 20).toFixed(2);
  const isOverLimit = withdrawCoins > totalCoins;
  const hasEnoughCoins = totalCoins > 0 && withdrawCoins > 0 && !isOverLimit;

  const onCoinChange = (event) => {
    const rawValue = event.target.value;
    if (rawValue === "") {
      setWithdrawCoin("");
      return;
    }

    const parsed = Number(rawValue);
    if (Number.isNaN(parsed) || parsed < 0) {
      return;
    }

    const adjusted = parsed > totalCoins ? totalCoins : parsed;
    setWithdrawCoin(adjusted);
  };

  const onPaymentSystemChange = (event) => {
    setPaymentSystem(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!user?.email) {
      toast.error("You must be logged in to submit a withdrawal request.");
      setIsSubmitting(false);
      return;
    }

    const requestedCoins = Number(withdrawCoin) || 0;
    if (requestedCoins <= 0 || requestedCoins > totalCoins) {
      toast.error("Enter a valid coin amount within your balance.");
      setIsSubmitting(false);
      return;
    }

    if (!paymentSystem) {
      toast.error("Please select a payment system.");
      setIsSubmitting(false);
      return;
    }

    const withdrawalPayload = {
      worker_email: user.email,
      worker_name: userData?.name || user.displayName || user.email,
      withdrawal_coin: requestedCoins,
      withdrawal_amount: Number((requestedCoins / 20).toFixed(2)),
      payment_system: paymentSystem,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await apiFetch("/withdrawal", {
        method: "POST",
        body: JSON.stringify(withdrawalPayload),
      });
      toast.success("Withdrawal request submitted successfully.");
      setWithdrawCoin("");
      setPaymentSystem("");
      fetchUserData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit withdrawal request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Withdraw Request
      </h2>
      <div className="grid gap-4 mb-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
          <p className="text-sm text-gray-600">Total Coins</p>
          <p className="text-3xl font-semibold text-blue-700">{totalCoins}</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
          <p className="text-sm text-gray-600">Equivalent Value</p>

          <p className="text-3xl font-semibold text-blue-700">
            ${((totalCoins || 0) / 20).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">20 coins = $1</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Worker Name
          </label>

          <input
            type="text"
            value={userData?.name || user?.displayName || "Not available"}
            readOnly
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Worker Email
          </label>

          <input
            type="text"
            value={user?.email || "Not available"}
            readOnly
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coin To Withdraw
          </label>

          <input
            type="number"
            min="0"
            max={totalCoins}
            step="1"
            placeholder="Enter coins"
            value={withdrawCoin}
            onChange={onCoinChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700"
          />

          <p className="mt-1 text-xs text-gray-500">
            You can withdraw up to {totalCoins} coins.{" "}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Withdraw Amount ($)
          </label>

          <input
            type="text"
            value={withdrawAmount}
            readOnly
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment System
          </label>

          <select
            value={paymentSystem}
            onChange={onPaymentSystemChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700"
          >
            <option value="">Select payment system</option>
            <option value="stripe">Stripe</option>
            <option value="bkash">Bkash</option>
            <option value="rocket">Rocket</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        {isOverLimit || totalCoins === 0 ? (
          <p className="text-center text-red-600 font-semibold">
            Insufficient coin
          </p>
        ) : (
          <button
            type="submit"
            disabled={!hasEnoughCoins || !paymentSystem || isSubmitting}
            className={`w-full rounded-md py-2 text-white transition ${
              hasEnoughCoins && paymentSystem
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting…" : "Withdraw"}{" "}
          </button>
        )}
      </form>{" "}
    </div>
  );
};

export default Withdrawals;
