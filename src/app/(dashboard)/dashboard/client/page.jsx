import React from "react";
import {
  Briefcase,
  FolderOpen,
  Activity,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getSummaryOverviewClient } from "@/lib/Action/ClientAPI/client";
import { getUser } from "@/lib/session";

const ClientHomePage = async () => {
  // 1. Get current logged-in client user data from session layer
  const user = await getUser(); // Assuming server-side resolution
  const clientEmail = user?.email;

  // 2. Fetch data directly inside server component layer
  const dynamicStats = (await getSummaryOverviewClient(clientEmail)) || {};
  console.log("Dynamic Stats from API:", dynamicStats);

  const stats = [
    {
      title: "Total Tasks",
      value: dynamicStats.totalTasks ?? "0",
      change: "Project listings published",
      icon: Briefcase,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Open Tasks",
      value: dynamicStats.openTasks ?? "0",
      change: "Awaiting developer bids",
      icon: FolderOpen,
      iconColor: "text-purple-600 bg-purple-50",
    },
    {
      title: "Tasks In Progress",
      value: dynamicStats.inProgressTasks ?? "0",
      change: "Active milestones running",
      icon: Activity,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Spent",
      value: dynamicStats.totalSpent
        ? `$${Number(dynamicStats.totalSpent).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        : "$0.00",
      change: "Processed escrow outlays",
      icon: CreditCard,
      iconColor: "text-green-600 bg-green-50",
    },
  ];

  // Added Value Section Mock Info: Upcoming Milestones tracking list
  const upcomingMilestones = [
    {
      id: 1,
      title: "UI Mockups Approval",
      project: "E-Commerce Rebuild",
      date: "June 26, 2026",
      status: "pending",
    },
    {
      id: 2,
      title: "Database Architecture Setup",
      project: "Delivery Fleet Mobile App",
      date: "June 29, 2026",
      status: "overdue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      {/* 1. OVERVIEW HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Client Project Hub
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Monitor your active development pipelines, open task listings, and
          processed budget metrics.
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
                  <TrendingUp className="w-3 h-3 text-blue-500 inline" />{" "}
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

      {/* 3. ADDITIONAL VALUE SECTIONS FOR CLIENT OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Upcoming Deliverable Trackers */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Approaching Milestones
            </h3>
            <p className="text-xs text-gray-400">
              Deadlines assigned to active freelancers working on your projects.
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="py-4 flex items-center justify-between text-sm"
              >
                <div className="space-y-0.5">
                  <p className="text-gray-800 font-bold">{milestone.title}</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Project: {milestone.project}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />{" "}
                    {milestone.date}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border uppercase tracking-wide ${
                      milestone.status === "overdue"
                        ? "bg-red-50 text-red-600 border-red-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Quick Links Panel */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Workspace Quick Actions
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Jump directly to your active management workflows.
            </p>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Post a New Project Listing
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Review Proposal Bids
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Download Invoices & Statements
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHomePage;
