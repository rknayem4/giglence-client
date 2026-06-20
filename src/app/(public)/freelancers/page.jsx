"use client";

import { useEffect, useState } from "react";
import { Magnifier, Person, Envelope, Laptop } from "@gravity-ui/icons";
import { Input, Button } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaLaptop } from "react-icons/fa6";
import { getAllFreelancers } from "@/lib/Action/publicAPI";
import FreelancerCard from "@/Components/Shared/FreelancerCard";

export default function FreelancerBrowserPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTalentPool = async () => {
      try {
        setLoading(true);
        const data = await getAllFreelancers();
        setFreelancers(data);
      } catch (err) {
        toast.error(err.message || "Failed to load freelancer listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchTalentPool();
  }, []);

  // Compute filtered talent on the fly during the render pass (Prevents Warning Errors)
  const filteredFreelancers = freelancers.filter((freelancer) => {
    const query = searchQuery.toLowerCase().trim();
    if (query === "") return true;

    // Check matches against Name, Email, Title, or Skills array values safely
    const matchesName = freelancer.name?.toLowerCase().includes(query);
    const matchesEmail = freelancer.email?.toLowerCase().includes(query);
    const matchesTitle = freelancer.title?.toLowerCase().includes(query);
    const matchesSkills = freelancer.skills?.some((skill) =>
      skill.toLowerCase().includes(query),
    );

    return matchesName || matchesEmail || matchesTitle || matchesSkills;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      {/* Directory Introduction Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#333333] sm:text-3xl">
          Discover Top Freelance Talent
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Review verified contractor profiles, explore technical expertise sets,
          and connect with optimal resources for your projects.
        </p>
      </div>

      {/* Modern Relative Search Control Wrapper Box */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="relative flex items-center w-full shadow-sm rounded-2xl bg-white border border-gray-100 p-1">
          <span className="absolute left-4 z-10 flex items-center pointer-events-none">
            <Magnifier className="text-gray-400 " size={18} />
          </span>
          <Input
            placeholder="Search freelancers by name, specialized roles, or specific skills (e.g. React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-0 focus:ring-0 [&_input]:pl-11 h-12 pl-12"
          />
        </div>
      </div>

      {/* Main View Area Routing Content */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          Accessing active directory assets...
        </div>
      ) : filteredFreelancers.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto">
          <Person size={36} className="mx-auto text-gray-300 mb-2" />
          <h3 className="text-base font-bold text-gray-700">
            No Freelancers Match Your Search
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Try redefining your search keyword constraints.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFreelancers.map((user) => (
            <FreelancerCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
