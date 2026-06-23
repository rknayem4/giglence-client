import React from 'react';
import { DollarSign, BarChart3, ShieldCheck, Mail, Tag, TrendingUp } from 'lucide-react';
import { getPaymentsForAdmin } from '@/lib/admin/admin';

const TransactionsHistory = async () => {
  // Pull aggregated transactional data array from your updated endpoint structure
  const payments = await getPaymentsForAdmin() || [];

  // 🧮 Calculate financial metrics dynamically from your live ledger data
  const totalTransactionCount = payments.length;
  const totalVolumeAmount = payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      
      {/* SECTION HEADING WITH SUBTITLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Financial Transactions
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Monitor real-time application processing history across system escrow milestones, clients, and payouts.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          Stripe Real-Time Audit Connected
        </div>
      </div>

      {/* 📊 LIVE METRIC STAT CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Total Volume Metric Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Volume Processed</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              ${totalVolumeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live Gross Volume
            </span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>

        {/* Transaction Count Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Ledger Entries</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              {totalTransactionCount.toLocaleString()}
            </h2>
            <span className="text-[11px] text-gray-400 font-medium block">
              Successful gateway checkout sessions
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <BarChart3 className="w-6 h-6" strokeWidth={2.5} />
          </div>
        </div>

      </div>

      {/* TABULAR TRANSACTION GRID */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-b-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-base">Ledger Processing Records</h3>
          <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2.5 py-1 rounded-full">
            Showing all rows
          </span>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-20 max-w-sm mx-auto">
            <p className="text-sm font-medium text-gray-400 italic">
              No processing transactions found inside the ledger registry yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Task Info</th>
                  <th className="py-4 px-6">Client Identity</th>
                  <th className="py-4 px-6">Freelancer Recipient</th>
                  <th className="py-4 px-6">Gateway Status</th>
                  <th className="py-4 px-6 text-right">Amount Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50/40 transition">
                    
                    {/* Task Title & Joined Category */}
                    <td className="py-4 px-6 space-y-1 max-w-[220px]">
                      <p className="text-gray-900 font-extrabold tracking-tight truncate">
                        {payment.task_title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                        <Tag className="w-2.5 h-2.5" />
                        {payment.category}
                      </span>
                    </td>

                    {/* Client Email Identity */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {payment.client_email}
                      </div>
                    </td>

                    {/* Freelancer Email Identity */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {payment.freelancer_email}
                      </div>
                    </td>

                    {/* Transaction Lifecycle Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase ${
                        payment.status === 'paid' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {payment.status}
                      </span>
                    </td>

                    {/* Financial Amount Value Column */}
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-900 font-black text-sm block">
                        ${Number(payment.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono tracking-tighter">
                        {payment.stripe_session_id ? `${payment.stripe_session_id.substring(0, 12)}...` : 'Manual Settlement'}
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

export default TransactionsHistory;