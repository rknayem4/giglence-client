"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/admin/tasks`);

        if (!res.ok)
          throw new Error("Failed to pull marketplace task records.");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch the posted marketplace task list.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleBlock = async (taskId, currentStatus) => {
    const blockTask = currentStatus !== "blocked";
    const alertMessage = blockTask
      ? "Are you sure you want to block this task from the public marketplace directory?"
      : "Are you sure you want to unblock this task and return its status to open?";

    if (!confirm(alertMessage)) return;

    try {
      setProcessingId(taskId);
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

      const res = await fetch(`${baseUrl}/api/admin/tasks/${taskId}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockTask }),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || "Mutation execution failed.");

      toast.success(
        blockTask ? "Task listing blocked." : "Task listing restored to open.",
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, status: blockTask ? "blocked" : "open" }
            : task,
        ),
      );
    } catch (err) {
      toast.error(
        err.message ||
          "An unexpected error occurred during state modification.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to permanently delete this open task? This action cannot be undone.")) return;

    try {
      setProcessingId(taskId);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

      const res = await fetch(`${baseUrl}/api/admin/tasks/${taskId}`, {
        method: "DELETE"
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Deletion validation check failed.");

      toast.success("Open task deleted successfully.");
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-400 font-medium">
        Loading task registries...
      </div>
    );

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Marketplace Project Audit Panel
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Review job listings. Only <strong>open</strong> tasks can be deleted from the system entirely.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Project Title</th>
                <th className="p-4">Client Contact</th>
                <th className="p-4">Budget Range</th>
                <th className="p-4">Live Status</th>
                <th className="p-4 pr-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                    No project listings posted inside database indexes yet.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => {
                  const currentStatus = task.status || "open";

                  const isLockedFromMod =
                    currentStatus === "completed" ||
                    currentStatus === "accepted" ||
                    currentStatus === "On the progress";

                  return (
                    <tr key={task._id} className="hover:bg-gray-50/50 transition duration-150">
                      {/* Title Details */}
                      <td className="p-4 pl-6 max-w-xs">
                        <div className="font-bold text-gray-800 truncate">{task.title}</div>
                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{task.description}</div>
                      </td>

                      {/* Email Coordinates */}
                      <td className="p-4 font-medium text-gray-500">
                        {task.clientEmail || task.client_email || "System User"}
                      </td>

                      {/* Allocated Budget */}
                      <td className="p-4 font-bold text-purple-600">${task.budget}</td>

                      {/* Current System Status Badges */}
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${
                          currentStatus === "blocked"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : currentStatus === "completed"
                              ? "bg-gray-100 text-gray-500 border-gray-200"
                              : currentStatus === "accepted" || currentStatus === "On the progress"
                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }`}>
                          {currentStatus}
                        </span>
                      </td>

                      {/* Operational Action Controls */}
                      <td className="p-4 pr-6 text-right flex items-center justify-end gap-2 h-full min-h-[64px]">
                        {isLockedFromMod ? (
                          <span className="text-xs text-gray-400 italic font-medium pr-2">
                            {currentStatus === "completed" ? "Project Finalized" : "Contract Active"}
                          </span>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              isDisabled={processingId === task._id}
                              isLoading={processingId === task._id}
                              onClick={() => handleToggleBlock(task._id, currentStatus)}
                              className={`text-xs font-bold px-4 h-8 rounded-xl transition ${
                                currentStatus === "blocked"
                                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                                  : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-100"
                              }`}
                            >
                              {currentStatus === "blocked" ? "Unblock" : "Block"}
                            </Button>

                            {/* Render Delete Option ONLY if status is open */}
                            {currentStatus === "open" && (
                              <Button
                                size="sm"
                                isDisabled={processingId === task._id}
                                onClick={() => handleDeleteTask(task._id)}
                                className="text-xs font-bold px-4 h-8 rounded-xl bg-red-600 hover:bg-red-900 text-white shadow-sm transition"
                              >
                                Delete
                              </Button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}