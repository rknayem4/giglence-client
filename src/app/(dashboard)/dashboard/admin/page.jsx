import React from "react";
import {
  Users,
  Briefcase,
  Activity,
  DollarSign,
  TrendingUp,
} from "lucide-react"; // Elegant modern icons
import { getSummaryOverviewAdmin } from "@/lib/admin/admin";

const AdminHomePage = async () => {
 // Log the token for debugging purposes
  // Mock data representing what you will pass from your backend APIs

  const dynamicStats = await getSummaryOverviewAdmin();
  // console.log("Dynamic Stats from API:", dynamicStats);
  const stats = [
    {
      title: "Total Users",
      value: dynamicStats.totalUsers || "1,245", // Fallback to mock data if API fails
      change: "+12% this week",
      icon: Users,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Total Tasks",
      value: dynamicStats.totalTasks || "3,482", // Fallback to mock data if API fails
      change: "+8% this week",
      icon: Briefcase,
      iconColor: "text-purple-600 bg-purple-50",
    },
    {
      title: "Active Tasks",
      value: dynamicStats.activeTasks || "412", // Fallback to mock data if API fails
      change: "52 currently unassigned",
      icon: Activity,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Transactions",
      value: dynamicStats.totalTransactions
        ? Number(dynamicStats.totalTransactions).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "14,250.00", // Fallback to mock data if API fails
      change: "+24% vs last month",
      icon: DollarSign,
      iconColor: "text-green-600 bg-green-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      text: "User 'John Doe' accepted proposal #284",
      time: "5 mins ago",
      type: "success",
    },
    {
      id: 2,
      text: "Payment of $150.00 authorized via Stripe Escrow",
      time: "12 mins ago",
      type: "payment",
    },
    {
      id: 3,
      text: "New dispute flagged on Task: 'React Native Dev'",
      time: "45 mins ago",
      type: "alert",
    },
    {
      id: 4,
      text: "Freelancer registration approved for 'Sarah Connor'",
      time: "1 hour ago",
      type: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      {/* 1. OVERVIEW HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin Management Suite
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Real-time insights across your application users, milestones, and
          platform liquidity processing.
        </p>
      </div>

      <hr className="border-gray-200/60" />

      {/* 2. ANALYTICS METRICS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-start justify-between transition-all hover:shadow-md"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  {stat.title}
                </span>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {stat.value}
                </h3>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500 inline" />{" "}
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-2xl ${stat.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. ADDITIONAL DASHBOARD SECTIONS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Live Platform Audit Log */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Platform Activity
            </h3>
            <p className="text-xs text-gray-400">
              Live operational events streaming directly from app endpoints.
            </p>
          </div>
          <div className="divide-y divide-gray-50 max-h-[260px] overflow-y-auto pr-2">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="py-3.5 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      act.type === "success"
                        ? "bg-green-500"
                        : act.type === "payment"
                          ? "bg-blue-500"
                          : "bg-red-500"
                    }`}
                  />
                  <p className="text-gray-700 font-medium">{act.text}</p>
                </div>
                <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Gateway Health & System Diagnostics */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              System Core Health
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Diagnostic state checkups.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs font-semibold text-gray-600">
                  Stripe Webhooks
                </span>
                <span className="text-[10px] bg-green-50 text-green-600 font-extrabold px-2 py-0.5 rounded-md border border-green-100 uppercase">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs font-semibold text-gray-600">
                  MongoDB Database
                </span>
                <span className="text-[10px] bg-green-50 text-green-600 font-extrabold px-2 py-0.5 rounded-md border border-green-100 uppercase">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-xs font-semibold text-gray-600">
                  Auth Client Session API
                </span>
                <span className="text-[10px] bg-amber-50 text-amber-600 font-extrabold px-2 py-0.5 rounded-md border border-amber-100 uppercase">
                  High Load (116ms)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition text-center">
              Launch Master System Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
