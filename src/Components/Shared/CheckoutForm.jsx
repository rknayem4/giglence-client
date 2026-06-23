// Components/Shared/CheckoutForm.jsx
"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function CheckoutForm({ paymentDetails, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    // 1. Confirm the card payment details via Stripe's network
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", 
    });

    if (error) {
      toast.error(error.message || "Payment authentication failed.");
      setIsProcessing(false);
      return;
    }

    // 2. If successful, pass payload details to your Mongo API endpoint
    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/save-success`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proposalId: paymentDetails.proposalId,
            taskId: paymentDetails.taskId,
            taskTitle: paymentDetails.taskTitle,
            amount: paymentDetails.amount,
            clientEmail: paymentDetails.clientEmail,
            freelancerEmail: paymentDetails.freelancerEmail,
            transactionId: paymentIntent.id
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success("Proposal accepted and budget secured in escrow!");
          onClose(); // Close modal on complete success
          window.location.reload(); // Refresh to update active statuses
        }
      } catch (dbErr) {
        console.error(dbErr);
        toast.error("Payment went through, but failed to log state in database.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">Secure Project Funds</h3>
        <p className="text-sm text-gray-500 mt-1">Project: <span className="font-semibold text-gray-700">{paymentDetails.taskTitle}</span></p>
        <p className="text-lg font-extrabold text-blue-600 mt-2">${paymentDetails.amount} USD</p>
      </div>

      <PaymentElement />

      <div className="flex gap-3 justify-end pt-4">
        <Button variant="flat" color="danger" onClick={onClose} disabled={isProcessing}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
        >
          {isProcessing ? "Processing Card..." : "Pay and Accept Proposal"}
        </Button>
      </div>
    </form>
  );
}