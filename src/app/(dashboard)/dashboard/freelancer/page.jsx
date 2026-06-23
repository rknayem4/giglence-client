import React from "react";
import {
  Briefcase,
  Clock,
  Activity,
  DollarSign,
  TrendingUp,
  Award,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { getUser } from "@/lib/session";
import { getSummaryOverviewFreelancer } from "@/lib/Action/FreelancerAPI/freelancer";

const FreelancerHomePage = async () => {
  // 1. Resolve current logged-in user context
  const user = await getUser();
  const freelancerEmail = user?.email;

  // 2. Load database metrics via clean Server Component fetch patterns
  const dynamicStats =
    (await getSummaryOverviewFreelancer(freelancerEmail)) || {};

  const stats = [
    {
      title: "Total Proposals",
      value: dynamicStats.totalProposals ?? "0",
      change: "Submitted job bids",
      icon: Briefcase,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Pending Proposals",
      value: dynamicStats.pendingProposals ?? "0",
      change: "Awaiting client response",
      icon: Clock,
      iconColor: "text-purple-600 bg-purple-50",
    },
    {
      title: "On the Progress",
      value: dynamicStats.activeProposals ?? "0",
      change: "Active milestones working",
      icon: Activity,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Total Earnings",
      value: dynamicStats.totalEarnings
        ? `$${Number(dynamicStats.totalEarnings).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
        : "$0.00",
      change: "Withdrawn via platform wallet",
      icon: DollarSign,
      iconColor: "text-green-600 bg-green-50",
    },
  ];

  // Additional Layout Section additions: Performance badges tracking matrix
  const skillBadges = [
    {
      name: "Top Rated Talent",
      description: "Maintained > 90% Job Success Score metrics.",
      active: true,
    },
    {
      name: "Fast Responder",
      description:
        "Answers client chat proposals within an average window of 2 hours.",
      active: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      {/* 1. OVERVIEW HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Freelancer Workstation
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Track active bid submissions, processing metrics, milestone states,
          and payment ledger growth.
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

      {/* 3. ADDITIONAL VALUE SECTIONS FOR FREELANCER SUITE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Talent Metrics Trackers */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Platform Badges & Status
            </h3>
            <p className="text-xs text-gray-400">
              Account status criteria flags pulling from your profile evaluation
              scores.
            </p>
          </div>
          <div className="space-y-3">
            {skillBadges.map((badge, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4"
              >
                <div className="p-2 rounded-xl bg-white text-amber-500 shadow-sm border border-gray-100">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    {badge.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  </h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Freelance Core Workflow Tasks Links */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Developer Actions
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Quick launch system management utilities.
            </p>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Browse New Open Task Gigs
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Track Pending Pitch Proposals
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-100 transition font-semibold text-xs text-gray-700">
                Request Financial Payout
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHomePage;
