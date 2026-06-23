"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import HomeTaskCard from "./HomeTaskCard";

export default function FeaturedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTasks = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        
        const res = await fetch(`${baseUrl}/api/public/featured-tasks`);
        if (!res.ok) throw new Error("Could not populate community index.");
        
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching homepage listings:", err);
        toast.error("Failed to load featured project indices.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTasks();
  }, []);
  // console.log(tasks)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading Content Header Layout */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-50 px-3 py-1 rounded-full">
            Live Ecosystem Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore the Latest Featured Tasks
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Find high-paying open contracts posted by validated platform clients. Apply instantly and start collaborating.
          </p>
        </div>

        {/* Dynamic Context Status Rendering Framework */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 space-y-3">
            <Spinner color="purple" size="lg" />
            <span className="text-xs font-medium text-gray-400">Syncing live contracts index...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 bg-white rounded-3xl p-8 max-w-md mx-auto shadow-sm">
            <p className="text-sm text-gray-400 italic">
              All slots filled! No new active open projects found on the board right now. Check back shortly.
            </p>
          </div>
        ) : (
          /* Grid Index Content Frame Cards */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <HomeTaskCard key={task._id} task={task}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}