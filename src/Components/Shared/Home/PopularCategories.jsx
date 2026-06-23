"use client";

import React from "react";
import { motion } from "framer-motion";
import PopularCatCard from "./Card/PopularCatCard"; // Make sure this path is correct!

export default function PopularCategories() {
  const categories = [
    {
      name: "Design",
      slug: "design",
      description: "UI/UX, Brand Graphics, Mobile App Layouts",
      icon: (
        <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      bgClass: "bg-purple-50 group-hover:bg-purple-600 transition duration-300",
      borderHover: "hover:border-purple-200",
    },
    {
      name: "Writing",
      slug: "writing",
      description: "Content Strategy, Copywriting, Technical Docs",
      icon: (
        <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgClass: "bg-blue-50 group-hover:bg-blue-600 transition duration-300",
      borderHover: "hover:border-blue-200",
    },
    {
      name: "Development",
      slug: "development",
      description: "Fullstack Web, Native Apps, DevOps Engines",
      icon: (
        <svg className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      bgClass: "bg-emerald-50 group-hover:bg-emerald-600 transition duration-300",
      borderHover: "hover:border-emerald-200",
    },
    {
      name: "Marketing",
      slug: "marketing",
      description: "SEO Optimization, Growth, Paid Performance Ads",
      icon: (
        <svg className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      bgClass: "bg-amber-50 group-hover:bg-amber-600 transition duration-300",
      borderHover: "hover:border-amber-200",
    },
    {
      name: "Other",
      slug: "other",
      description: "Video Editing, Consultations, Custom Task Requests",
      icon: (
        <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      bgClass: "bg-gray-100 group-hover:bg-gray-800 transition duration-300",
      borderHover: "hover:border-gray-300",
    },
  ];

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-xl mx-auto"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Browse Ecosystem Work
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Popular Categories
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Click into your field of expertise to find active contracts waiting for tailored proposals right now.
          </p>
        </motion.div>

        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={cardItemVariants}>
              {/* Ensure you are rendering PopularCatCard here, passing 'cat' */}
              <PopularCatCard cat={cat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}