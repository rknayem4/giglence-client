"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { CiLink } from "react-icons/ci";

export default function ClientCompleted() {
  const { data: session } = authClient.useSession();
  const [completedList, setCompletedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
          const {data: tokenData} = await authClient.token();
        const res = await fetch(
          `${baseUrl}/api/client/completed-projects?email=${session.user.email}&role=client`,{
            headers: {
              authorization: `Bearer ${tokenData.token}`,
            }
          }
        );

        if (!res.ok) throw new Error("Failed to load historical completions.");
        const data = await res.json();
        setCompletedList(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch completed tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session?.user?.email]);

  if (loading)
    return (
      <div className="text-gray-400 font-medium text-center py-10">
        Loading completed deliverables...
      </div>
    );

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
        Your Completed Tasks
      </h2>

      {completedList.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center text-gray-400 italic text-sm">
          No contractors have submitted finished deliverables for your tasks
          yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {completedList.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm border-t-4 border-t-purple-500 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.taskTitle}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    Executed By Freelancer:{" "}
                    <span className="text-purple-600 font-semibold">
                      {item.freelancerEmail}
                    </span>
                  </p>
                </div>
                <span className="text-[10px] self-start bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-md border border-purple-100 uppercase tracking-wider">
                  Delivery Logged
                </span>
              </div>

              {item.message && (
                <div className="bg-purple-50/30 rounded-xl p-3 text-sm text-gray-600 border border-purple-100/50">
                  <strong className="text-xs text-purple-500 uppercase font-bold block mb-1">
                    Freelancer Cover Handover Message:
                  </strong>
                  {item.message}
                </div>
              )}

              <div className="pt-2 border-t border-gray-50 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-gray-400">
                <a
                  href={item.submittedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline font-bold bg-emerald-50/50 px-3 py-1.5 rounded-xl border border-emerald-100 w-fit"
                >
                  <CiLink size={14} /> Review Incoming Project Assets
                </a>
                <p>
                  Received:{" "}
                  {item.archivedAt
                    ? new Date(item.archivedAt).toLocaleString()
                    : "Recent"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
