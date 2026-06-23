import React from "react";
import {
  DollarSign,
  Wallet,
  ShieldCheck,
  Mail,
  Tag,
  TrendingUp,
} from "lucide-react";
import { getPaymentsForFreelancer } from "@/lib/Action/FreelancerAPI/freelancer";
import { getUser } from "@/lib/session";

const FreelancerTransactions = async () => {
  const user = await getUser();
  // Pass the target freelancer context email dynamically down to your fetch wrapper
  const freelancerEmail = user?.email;
  const payments = (await getPaymentsForFreelancer(freelancerEmail)) || [];

  // 🧮 Compute historical metrics dynamically
  const totalPayoutsCount = payments.length;
  const totalEarningsAmount = payments.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      {/* SECTION HEADING WITH SUBTITLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Earnings & Payouts
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Track your completed project incoming funds, payouts ledger, and
            cleared escrow transactions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          Payout Account Verified
        </div>
      </div>

      {/* 📊 FREELANCER METRIC STAT CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Total Earnings Metric Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Total Income Earned
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              $
              {totalEarningsAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Net Account Balance Gross
            </span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>

        {/* Total Invoices Count Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Completed Contracts
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {totalPayoutsCount}
            </h2>
            <span className="text-[11px] text-gray-400 font-medium block">
              Paid jobs processed through the network
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Wallet className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* TABULAR TRANSACTION GRID FRAMEWORK */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-b-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-base">
            Invoiced Earnings Log
          </h3>
          <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2.5 py-1 rounded-full">
            All Receipts
          </span>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-20 max-w-sm mx-auto">
            <p className="text-sm font-medium text-gray-400 italic">
              No processing transactions found inside your earnings ledger yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Task Project Info</th>
                  <th className="py-4 px-6">Client Email Account</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Net Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-50/40 transition"
                  >
                    {/* Task Title & Joined Category Token */}
                    <td className="py-4 px-6 space-y-1 max-w-[240px]">
                      <p className="text-gray-900 font-extrabold tracking-tight truncate">
                        {payment.task_title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                        <Tag className="w-2.5 h-2.5" />
                        {payment.category}
                      </span>
                    </td>

                    {/* Client Email Identity Field */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {payment.client_email}
                      </div>
                    </td>

                    {/* Transaction Status Tag Badge Layout */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase ${
                          payment.status === "paid"
                            ? "bg-green-50 text-green-600 border-green-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    {/* Financial Amount Value Revenue Column */}
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-900 font-black text-sm block">
                        $
                        {Number(payment.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono tracking-tighter">
                        {payment.stripe_session_id
                          ? `${payment.stripe_session_id.substring(0, 14)}...`
                          : "Direct Settlement"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerTransactions;
