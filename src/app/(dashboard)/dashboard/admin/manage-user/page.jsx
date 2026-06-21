"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/admin/users`);

        if (!res.ok) throw new Error("Failed to pull system user registries.");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load user accounts directory.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleSuspension = async (userId, currentStatus) => {
    const nextStatus = !currentStatus;
    const actionText = nextStatus ? "suspend" : "unsuspend";

    if (!confirm(`Are you sure you want to ${actionText} this user?`)) return;

    try {
      setProcessingId(userId);
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

      const res = await fetch(`${baseUrl}/api/admin/users/${userId}/suspend`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuspended: nextStatus }),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || "Mutation execution failed.");

      toast.success(
        nextStatus ? "Account suspended." : "Account access restored.",
      );

      // Update UI local array state immediately
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isSuspended: nextStatus } : user,
        ),
      );
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-400 font-medium">
        Loading system accounts...
      </div>
    );

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          User Administration Management
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Review profiles, assign authority, or restrict platform access
          globally.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-4 pl-6">User Persona</th>
                <th className="p-4">Email Coordinates</th>
                <th className="p-4">Platform Role</th>
                <th className="p-4">System Status</th>
                <th className="p-4 pr-6 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-400 italic"
                  >
                    No registered user accounts found inside the system
                    directory.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/50 transition duration-150"
                  >
                    {/* User Avatar & Name Grid */}
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-700 uppercase overflow-hidden shrink-0">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : user.name ? (
                          user.name.substring(0, 2)
                        ) : (
                          "US"
                        )}
                      </div>
                      <span className="font-bold text-gray-800">
                        {user.name || "Anonymous User"}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="p-4 font-medium text-gray-500">
                      {user.email}
                    </td>

                    {/* Role Chip Mapping Layout */}
                    <td className="p-4 capitalize">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${
                          user.role === "client"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : user.role === "admin"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : "bg-orange-50 text-orange-600 border-orange-100"
                        }`}
                      >
                        {user.role || "Freelancer"}
                      </span>
                    </td>

                    {/* Status Display Matrix Flags */}
                    <td className="p-4">
                      {user.isSuspended ? (
                        <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2.5 py-0.5 rounded-md border border-red-100 uppercase tracking-wider">
                          Suspended
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Operational Access Administration Management Action Button Row Controllers */}
                    <td className="p-4 pr-6 text-right">
                      <Button
                        size="sm"
                        isDisabled={
                          processingId === user._id || user.role === "admin"
                        }
                        isLoading={processingId === user._id}
                        onClick={() =>
                          handleToggleSuspension(user._id, user.isSuspended)
                        }
                        className={`text-xs font-bold px-4 h-8 rounded-xl transition ${
                          user.isSuspended
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                            : "bg-red-50 hover:bg-red-100 text-red-600 border border-red-100"
                        }`}
                      >
                        {user.isSuspended
                          ? "Unsuspend Account"
                          : "Suspend User"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
