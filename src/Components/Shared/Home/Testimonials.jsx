"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialsCard from "./Card/TestimonialsCard";

export default function Testimonials() {
  // Separate active user context views between Client and Freelancer reviews
  const [activeTab, setActiveTab] = useState("client");

  const clientReviews = [
    {
      id: 1,
      quote:
        "Finding specialized React developers for our dashboard overhaul was effortless. The contract pipeline kept milestones transparent and delivery secure.",
      name: "Sarah Jenkins",
      role: "CTO, AlphaStream Solutions",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 2,
      quote:
        "The quality of freelancers on this platform is unmatched. We managed to launch our complete digital marketing campaign two weeks ahead of schedule.",
      name: "David Chen",
      role: "Founder, GrowthPulse Media",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 3,
      quote:
        "Automated deliverables tracking and clear deadline enforcement saved us dozens of hours in project management overhead. Highly recommended ecosystem.",
      name: "Marcus Vance",
      role: "Operations Director, CoreBuild Ltd",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  const freelancerReviews = [
    {
      id: 1,
      quote:
        "I've secured three long-term contracts in my first month. The budget validation gate ensures I never have to worry about clients defaulting on payments.",
      name: "Elena Rostova",
      role: "Senior Fullstack Engineer",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 2,
      quote:
        "The interface makes submitting project milestones incredibly straightforward. It completely removes the usual administrative stress from freelancing work.",
      name: "Liam O'Connor",
      role: "UI/UX & Brand Designer",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 3,
      quote:
        "Clients here know exactly what they want. Having access to validated project specifications lets me jump in and start coding immediately without endless meetings.",
      name: "Aisha Rahman",
      role: "Technical Content Strategist",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
  ];

  const currentReviews =
    activeTab === "client" ? clientReviews : freelancerReviews;

  // Animation Grid Container Configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.97,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50/30 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading Content Layout */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-xl mx-auto flex flex-col items-center"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Community Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Backed by Real Success
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            See how clients scale their technical teams and how freelancers
            build thriving independent businesses on our platform.
          </p>

          {/* Segmented Control / Tab Switcher Layout */}
          <div className="relative inline-flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200/40 mt-2">
            {/* Client Tab Button */}
            <button
              onClick={() => setActiveTab("client")}
              className={`relative text-xs font-bold px-5 py-2 rounded-xl transition duration-200 z-10 ${
                activeTab === "client"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {activeTab === "client" && (
                <motion.div
                  layoutId="activeTabSlider"
                  className="absolute inset-0 bg-white shadow-sm rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Happy Clients
            </button>

            {/* Freelancer Tab Button */}
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`relative text-xs font-bold px-5 py-2 rounded-xl transition duration-200 z-10 ${
                activeTab === "freelancer"
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {activeTab === "freelancer" && (
                <motion.div
                  layoutId="activeTabSlider"
                  className="absolute inset-0 bg-white shadow-sm rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Top Freelancers
            </button>
          </div>
        </motion.div>

        {/* Dynamic Review Card Grid Display with PopLayout Mode */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid md:grid-cols-3 gap-6 pt-4"
          >
            {currentReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                layout // Smoothly morphs cards if any shared layout attributes shift
                className="h-full"
              >
                <TestimonialsCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
