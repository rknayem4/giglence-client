"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

// Initialize Stripe outside of component render cycles to avoid re-instantiation
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "⚠️ STRIPE WARNING: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in your .env.local file!",
  );
}

const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
// ==========================================
// A. MAIN WRAPPER COMPONENT
// ==========================================
export default function PaymentModal({ paymentData, onClose }) {
  // Config options for Stripe Elements styling and layout
  const options = {
    clientSecret: paymentData.clientSecret,
    appearance: { theme: "flat" },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Secure Escrow Authorization
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 max-w-[90%] truncate">
              Project: {paymentData.taskTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Financial Overview Card */}
        <div className="bg-purple-50/50 border border-purple-100/50 p-4 rounded-2xl mb-6 flex justify-between items-center">
          <span className="text-xs font-semibold text-purple-700">
            Contract Funding Target:
          </span>
          <span className="text-xl font-black text-purple-600">
            ${paymentData.amount}
          </span>
        </div>

        {/* STRIPE ELEMENTS CONTAINER */}
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm paymentData={paymentData} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}

// ==========================================
// B. INNER CHECKOUT FORM COMPONENT
// ==========================================
function CheckoutForm({ paymentData, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Stripe has not yet loaded completely

    setLoading(true);

    try {
      // 1. Confirm Card Payment via Stripe SDK engine using clientSecret
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: paymentData.clientEmail,
            },
          },
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        // 2. Persist success state securely to back-end mongo storage arrays
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

        const saveResponse = await fetch(
          `${baseUrl}/api/payments/save-success`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...paymentData,
              transactionId: paymentIntent.id,
            }),
          },
        );

        if (!saveResponse.ok) {
          throw new Error(
            "Payment processed by Stripe, but backend syncing failed. Please contact support.",
          );
        }

        toast.success("Project funded and contract activated successfully!");
        onClose(); // Shut modal framework viewport down cleanly
        window.location.reload(); // Refresh viewport metrics across table trees
      }
    } catch (err) {
      console.error("Gateway Transaction Fault:", err.message);
      toast.error(err.message || "An unhandled transaction anomaly occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Natively Structured Secured Input Area */}
      <div className="border border-gray-200 p-4 rounded-xl shadow-inner bg-gray-50/30">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#1f2937",
                "::placeholder": { color: "#9ca3af" },
              },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>

      {/* Control Actions Form Row */}
      <div className="flex gap-3 justify-end pt-2">
        <Button
          type="button"
          size="sm"
          variant="flat"
          onClick={onClose}
          disabled={loading}
          className="rounded-xl font-semibold text-xs"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          isLoading={loading}
          disabled={!stripe || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs px-5 shadow-md"
        >
          Authorize Funds
        </Button>
      </div>
    </form>
  );
}
