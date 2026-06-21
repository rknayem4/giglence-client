import { Button, Card } from "@heroui/react";
import Link from "next/link";
import React from "react";

const HomeTaskCard = ({ task }) => {
  return (
    <Card
      key={task._id}
      className="border border-gray-100 hover:border-purple-200 hover:shadow-2xl transition duration-300 bg-white rounded-3xl overflow-hidden shadow-sm"
    >
      {/* Fixed subcomponent hook: Changed Card.Body to Card.Content */}
      <Card.Content className="p-6 space-y-4">
        {/* Category Stamp Label & Budget Alignment Banner */}
        <div className="flex justify-between items-start gap-4">
          <span className="text-[10px] font-extrabold tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg uppercase">
            {task.category || "General / Tech"}
          </span>
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block">
              Budget
            </span>
            <span className="text-lg font-black text-emerald-600">
              ${task.budget}
            </span>
          </div>
        </div>

        {/* Core Information Block Structure */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 group-hover:text-purple-600 transition">
            {task.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {task.description ||
              "No full brief supplied by creator context. Click explore parameters to inspect deliverables requirements."}
          </p>
        </div>
      </Card.Content>

      {/* Subcomponent hook: Card.Footer */}
      <Card.Footer className="bg-gray-50/70 border-t border-gray-50 p-4 px-6 flex flex-col gap-3">
        <div className="flex justify-between items-center w-full text-xs text-gray-500">
          <div>
            <span className="text-[10px] text-gray-400 block font-medium">
              Client
            </span>
            <span className="font-bold text-gray-700 truncate max-w-[140px] block">
              {task.clientName || task.client_email || "Verified Recruiter"}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block font-medium">
              Deadline
            </span>
            <span className="font-bold text-red-600 bg-red-50/60 px-2 py-0.5 rounded-md border border-red-100/50">
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Flexible"}
            </span>
          </div>
        </div>
        <Link href={`/tasks/${task._id}`}>
          <Button
            className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold h-9 rounded-xl transition mt-1"
            size="sm"
          >
            View & Apply
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default HomeTaskCard;
