import { ArrowUpRight, Calendar } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { BsCurrencyBitcoin } from "react-icons/bs";

const TaskCard = ({task}) => {
  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-gray-200">
      <div>
        {/* Meta Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#3B82F6] capitalize">
            {task.category || "General"}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {task.status}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-[#333333] tracking-tight group-hover:text-[#3B82F6] transition-colors line-clamp-1">
          {task.title}
        </h3>
        <p className="mt-3 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Bottom Specs & Action Controls */}
      <div className="mt-6 border-t border-gray-50 pt-4">
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
            <BsCurrencyBitcoin size={16} className="text-amber-500" />
            <span>${task.budget}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Calendar size={14} />
            <span>Due: {task.deadline}</span>
          </div>
        </div>

        {/* Navigation Button */}
        <Link href={`/tasks/${task._id}`} passHref className="w-full">
          <Button className="w-full h-11 rounded-xl bg-gray-50 hover:bg-[#3B82F6] text-gray-700 hover:text-white font-medium transition-all flex items-center justify-center gap-1 group-hover:bg-gradient-to-r group-hover:from-[#3B82F6] group-hover:to-[#8B5CF6] group-hover:text-white">
            View Details <ArrowUpRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
