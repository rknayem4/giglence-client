"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import HomeTaskCard from "./HomeTaskCard";

export default function FeaturedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTasks = async () => {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

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

  // Framer Motion layout orchestration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading Content Header Layout */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-50 px-3 py-1 rounded-full">
            Live Ecosystem Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore the Latest Featured Tasks
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Find high-paying open contracts posted by validated platform
            clients. Apply instantly and start collaborating.
          </p>
        </motion.div>

        {/* Dynamic Context Status Rendering Framework */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center py-20 space-y-3"
            >
              <Spinner color="purple" size="lg" />
              <span className="text-xs font-medium text-gray-400">
                Syncing live contracts index...
              </span>
            </motion.div>
          ) : tasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16 border border-dashed border-gray-200 bg-white rounded-3xl p-8 max-w-md mx-auto shadow-sm"
            >
              <p className="text-sm text-gray-400 italic">
                All slots filled! No new active open projects found on the board
                right now. Check back shortly.
              </p>
            </motion.div>
          ) : (
            /* Grid Index Content Frame Cards */
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tasks.map((task) => (
                <motion.div
                  key={task._id}
                  variants={itemVariants}
                  layout // Enables smooth transitions if the list layout changes dynamically
                >
                  <HomeTaskCard task={task} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
