import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { apiFetch } from "../../apiService";

const packageOptions = [
  { id: "small", label: "10 Coins", coins: 10, amount: 100, price: 1 },
  { id: "medium", label: "150 Coins", coins: 150, amount: 1000, price: 10 },
  { id: "large", label: "500 Coins", coins: 500, amount: 2000, price: 20 },
  { id: "xlarge", label: "1000 Coins", coins: 1000, amount: 3500, price: 35 },
];

const StripeCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statePackage = location.state;
  const queryPackage = useMemo(() => {
    const pkgId = searchParams.get("package");
    return packageOptions.find((pkg) => pkg.id === pkgId);
  }, [searchParams]);

  const selectedPackage = statePackage || queryPackage;

  useEffect(() => {
    if (!selectedPackage) {
      navigate("/purchase-coins", { replace: true });
    }
  }, [selectedPackage, navigate]);

  const handleStripeCheckout = async () => {
    if (!selectedPackage) return;
    setLoading(true);
    setError("");

    try {
      const session = await apiFetch("/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          amount: selectedPackage.amount,
          currency: "usd",
          coins: selectedPackage.coins,
          success_url: `${window.location.origin}/purchase-coins?session_id={CHECKOUT_SESSION_ID}&package=${selectedPackage.id}`,
          cancel_url: `${window.location.origin}/purchase-coins?canceled=true`,
        }),
      });

      if (!session?.url) {
        throw new Error("Unable to start Stripe Checkout.");
      }

      window.location.href = session.url;
    } catch (err) {
      setError(err.message || "Could not redirect to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Stripe Checkout</h2>
          <p className="text-gray-600 mt-2">
            You are purchasing <span className="font-semibold">{selectedPackage.coins} coins</span> for
            <span className="font-semibold"> ${selectedPackage.price}</span>.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 mb-6">
          <p className="text-sm text-slate-500">Order details</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium">Package</span>
            <span>{selectedPackage.label}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium">Coins</span>
            <span>{selectedPackage.coins}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium">Amount</span>
            <span>${selectedPackage.price}</span>
          </div>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <button
          type="button"
          onClick={handleStripeCheckout}
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
        </button>
      </div>
    </div>
  );
};

export default StripeCheckoutPage;
