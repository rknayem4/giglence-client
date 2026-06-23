"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Effect 1 */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" 
      />

      {/* Background Effect 2 (Fixed line 46 syntax error here) */}
      <motion.div 
        animate={{
          y:2,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" 
      />

      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex min-h-[85vh] flex-col items-center justify-center text-center"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-[#3B82F6]"
          >
            🚀 Connect Clients & Freelancers Faster
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="max-w-5xl text-4xl font-extrabold leading-tight text-[#333333] md:text-6xl lg:text-7xl"
          >
            Get your tasks done by{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              skilled freelancers
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl"
          >
            Post your task, receive offers from talented freelancers,
            compare proposals, and get quality work delivered quickly and
            securely—all in one place.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/freelancers"
                className="block rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Browse Freelancers
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/tasks"
                className="block rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-[#333333] transition-colors duration-300 hover:border-[#3B82F6] hover:text-[#3B82F6]"
              >
                Browse Tasks
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div>
              <h3 className="text-3xl font-bold text-[#3B82F6]">500+</h3>
              <p className="text-gray-500">Active Freelancers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#8B5CF6]">1K+</h3>
              <p className="text-gray-500">Tasks Completed</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#3B82F6]">98%</h3>
              <p className="text-gray-500">Client Satisfaction</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;