import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { apiFetch } from "../../apiService";
import { AuthContext } from "../../context/AuthContext";
import { UserDataContext } from "../../context/UserDataContext";

const CheckoutForm = ({ amount, currency, coins }) => {
  const { user } = useContext(AuthContext);
  const { fetchUserData } = useContext(UserDataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!user?.email) {
      setError("You must be logged in to purchase coins.");
      return;
    }

    setLoading(true);
    setError("");
    setConfirmation("");

    try {
      const paymentIntent = await apiFetch("/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount, currency }),
      });

      const { clientSecret } = paymentIntent;
      if (!clientSecret) {
        throw new Error("Unable to create payment intent.");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card input is not ready.");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        throw result.error;
      }

      if (result.paymentIntent?.status === "succeeded") {
        // Update buyer's coins
        const coinResult = await apiFetch("/users/coins", {
          method: "PATCH",
          body: JSON.stringify({
            email: user.email,
            coins,
          }),
        });

        // Save payment transaction
        await apiFetch("/payments", {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            coins,
            amount: amount / 100, // Convert from cents to dollars
            currency,
            paymentIntentId: result.paymentIntent.id,
            status: "completed",
            timestamp: new Date().toISOString(),
          }),
        });

        // Refresh user data in context
        await fetchUserData();

        setConfirmation(
          `Payment successful! You purchased ${coins} coins. Your balance has been updated to ${coinResult.coins} coins.`,
        );
        setTimeout(() => navigate("/purchase-coins"), 2500);
      } else {
        throw new Error("Payment not completed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {confirmation ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          <p className="font-semibold">{confirmation}</p>
          <p className="mt-2 text-sm text-slate-600">
            Redirecting you back to the purchase page...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded border border-slate-200 bg-white p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
              className="p-3"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
