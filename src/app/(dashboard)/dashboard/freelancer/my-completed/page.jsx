"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { CiLink } from "react-icons/ci";

export default function FreelancerCompleted() {
  const { data: session } = authClient.useSession();
  const [completedList, setCompletedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/dashboard/completed-projects?email=${session.user.email}&role=freelancer`);
        
        if (!res.ok) throw new Error("Failed to pull archived dataset lists.");
        const data = await res.json();
        setCompletedList(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch completed project history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session?.user?.email]);

  if (loading) return <div className="text-gray-400 font-medium text-center py-10">Loading finished milestones...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Your Completed Projects</h2>
      
      {completedList.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center text-gray-400 italic text-sm">
          You haven't marked any projects as completed yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {completedList.map((item) => (
            <div key={item._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm border-t-4 border-t-emerald-500 space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.taskTitle}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    Hiring Manager: <span className="text-gray-600 font-semibold">{item.clientEmail}</span>
                  </p>
                </div>
                <span className="text-[10px] self-start bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider">
                  Archived / Completed
                </span>
              </div>

              {item.message && (
                <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 italic border-l-2 border-gray-300">
                  <strong className="text-xs text-gray-400 uppercase font-bold block not-italic mb-1">Your Submission Note:</strong>
                  "{item.message}"
                </div>
              )}

              <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <a 
                  href={item.submittedLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100"
                >
                  <CiLink size={14} /> View Deliverable Assets
                </a>
                <p>Closed on: {item.archivedAt ? new Date(item.archivedAt).toLocaleDateString() : "Recent"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}