import React from 'react';
import { AlertTriangle, RefreshCcw, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const CanceledPaymentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-center space-y-6 transition-all hover:shadow-2xl">
        
        {/* Soft Alert Icon Layer */}
        <div className="flex justify-center">
          <div className="p-4 bg-amber-50 rounded-full text-amber-500">
            <AlertTriangle className="w-16 h-16" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Communication Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Checkout Canceled
          </h1>
          <p className="text-sm font-medium text-gray-400 leading-relaxed">
            Your transaction process was closed. Don't worry—no payment was deducted from your card or account wallet registry.
          </p>
        </div>

        {/* Security Assurances Panel */}
        <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex items-center gap-3 text-left">
          <div className="p-2 rounded-xl bg-white text-gray-400 border border-gray-100 shadow-sm shrink-0">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-gray-800">Your Session is Secure</h4>
            <p className="text-[11px] text-gray-400 font-medium">
              You can restart execution or back out anytime without security risk exposures.
            </p>
          </div>
        </div>

        {/* Double Navigation Action Interface */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Typically references back to the task proposal review or checkout entry point */}
          <Link 
            href="/tasks"
            className="w-full flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Try Checkout Again
          </Link>
          
          <Link 
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CanceledPaymentPage;