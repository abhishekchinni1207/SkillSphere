import axios from "axios";
import { API_BASE_URL } from "../config/api";
import React, { useState } from "react";

// eslint-disable-next-line no-unused-vars
export default function StripeButton({ courseId, amount, onSuccess }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in before purchasing a course.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`, {
        courseId,
        amount,
        userId: user.id,
      });

      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Stripe response missing URL:", res.data);
        alert("Stripe checkout failed to start.");
      }
    } catch (err) {
      console.error("Stripe session error:", err.response?.data || err.message);
      alert("Payment initialization failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 ${
        loading
          ? "bg-gradient-to-r from-yellow-400 to-pink-400 opacity-75 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-pink-500 hover:from-pink-500 hover:to-blue-600 hover:shadow-lg"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center space-x-2">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Processing...</span>
        </span>
      ) : (
        <>
          💳 Buy Course •{" "}
          <span className="font-bold text-yellow-200">₹{amount}</span>
        </>
      )}
    </button>
  );
}
