import { Calendar, FileText } from "@gravity-ui/icons";
import Link from "next/link";
import React from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";

const ProposalsFreeCard = ({ item }) => {
  // Status Badge styling helper mapping logic
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition hover:shadow-md flex flex-col justify-between md:flex-row md:items-center gap-6">
      {/* Proposal core values details frame */}
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusStyles(item.status)}`}
          >
            {item.status}
          </span>
          <Link
            href={`/tasks/${item.task_id}`}
            className=" font-mono select-all text-blue-600 underline font-semibold"
          >
            View Task
          </Link>
        </div>

        <div className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100/50">
          <div className="flex items-start gap-2">
            <FileText size={16} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="line-clamp-2 italic">{item.cover_note}</p>
          </div>
        </div>

        {/* Grid analytics specifications info block */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1 text-gray-800">
            <BsCurrencyBitcoin size={14} className="text-amber-500" /> Bidded
            Rate: <strong>${item.proposed_budget}</strong>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} /> Duration:{" "}
            <strong>{item.estimated_days} days</strong>
          </div>
          <div className="text-gray-400">
            Submitted:{" "}
            {new Date(item.submitted_at).toLocaleDateString(undefined, {
              dateStyle: "medium",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalsFreeCard;
