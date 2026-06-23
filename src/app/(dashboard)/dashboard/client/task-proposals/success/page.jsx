import React from "react";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

const SuccessPaymentPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid payment session
      </div>
    );
  }

  // Retrieve Stripe session
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // Payment information
  const amountPaid = `$${(session.amount_total / 100).toFixed(2)}`;
  const transactionId = session.id;

  // Save payment only after successful payment
  // if (session.payment_status === "paid") {
  //   try {
  //     await fetch(`${process.env.BACKEND_URL}/payments/save`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },

  //       body: JSON.stringify({
  //         stripe_session_id: session.id,

  //         payment_intent: session.payment_intent,

  //         proposal_id: session.metadata?.proposalId,

  //         task_id: session.metadata?.taskId,

  //         task_name: session.metadata?.task_name,

  //         client_email: session.metadata?.client_email,

  //         freelancer_email: session.metadata?.freelancer_email,

  //         freelancer_id: session.metadata?.freelancer_id,

  //         amount: session.amount_total / 100,

  //         status: "paid",

  //         paid_at: new Date().toISOString(),
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Payment save failed:", error);
  //   }
  // }
  if (session.payment_status === "paid") {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payments/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripe_session_id: session.id,

        proposal_id: session.metadata.proposalId,

        task_id: session.metadata.taskId,

        client_email: session.metadata.client_email,

        freelancer_email: session.metadata.freelancer_email,

        amount: session.amount_total / 100,

        status: "paid",
      }),
    });

    // Accept proposal after payment
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/proposals/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: session.metadata.taskId,

        acceptedProposalId: session.metadata.proposalId,
      }),
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-green-50 rounded-full text-green-500 animate-bounce">
            <CheckCircle2 className="w-16 h-16" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">
            Payment Successful!
          </h1>

          <p className="text-sm text-gray-400">
            Your payment has been verified and your contract process has
            started.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase">Amount Paid</span>

            <span className="text-gray-900 font-bold">{amountPaid}</span>
          </div>

          <div className="border-t border-gray-200" />

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase">
              Transaction ID
            </span>

            <span className="text-xs font-mono bg-white px-2 py-1 rounded border">
              {transactionId.slice(0, 20)}...
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase">Gateway</span>

            <span className="font-bold text-gray-600">Stripe</span>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Payment receipt and contract information will be available in your
          dashboard.
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/client/task-proposals"
            className="flex items-center justify-center gap-2 bg-gray-950 text-white font-bold text-xs py-3 rounded-xl"
          >
            Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/tasks"
            className="flex items-center justify-center gap-2 bg-white border text-gray-700 font-bold text-xs py-3 rounded-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
