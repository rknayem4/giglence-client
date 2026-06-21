"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";

export default function Testimonials() {
  // Separate active user context views between Client and Freelancer reviews
  const [activeTab, setActiveTab] = useState("client");

  const clientReviews = [
    {
      id: 1,
      quote: "Finding specialized React developers for our dashboard overhaul was effortless. The contract pipeline kept milestones transparent and delivery secure.",
      name: "Sarah Jenkins",
      role: "CTO, AlphaStream Solutions",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 2,
      quote: "The quality of freelancers on this platform is unmatched. We managed to launch our complete digital marketing campaign two weeks ahead of schedule.",
      name: "David Chen",
      role: "Founder, GrowthPulse Media",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 3,
      quote: "Automated deliverables tracking and clear deadline enforcement saved us dozens of hours in project management overhead. Highly recommended ecosystem.",
      name: "Marcus Vance",
      role: "Operations Director, CoreBuild Ltd",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const freelancerReviews = [
    {
      id: 1,
      quote: "I've secured three long-term contracts in my first month. The budget validation gate ensures I never have to worry about clients defaulting on payments.",
      name: "Elena Rostova",
      role: "Senior Fullstack Engineer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 2,
      quote: "The interface makes submitting project milestones incredibly straightforward. It completely removes the usual administrative stress from freelancing work.",
      name: "Liam O'Connor",
      role: "UI/UX & Brand Designer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: 3,
      quote: "Clients here know exactly what they want. Having access to validated project specifications lets me jump in and start coding immediately without endless meetings.",
      name: "Aisha Rahman",
      role: "Technical Content Strategist",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const currentReviews = activeTab === "client" ? clientReviews : freelancerReviews;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading Content Layout */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
            Community Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Backed by Real Success
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            See how clients scale their technical teams and how freelancers build thriving independent businesses on our platform.
          </p>

          {/* Segmented Control / Tab Switcher Layout */}
          <div className="inline-flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200/40 mx-auto">
            <button
              onClick={() => setActiveTab("client")}
              className={`text-xs font-bold px-5 py-2 rounded-xl transition duration-200 ${
                activeTab === "client" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Happy Clients
            </button>
            <button
              onClick={() => setActiveTab("freelancer")}
              className={`text-xs font-bold px-5 py-2 rounded-xl transition duration-200 ${
                activeTab === "freelancer" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Top Freelancers
            </button>
          </div>
        </div>

        {/* Dynamic Review Card Grid Display Passing Passes */}
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          {currentReviews.map((review) => (
            <Card
              key={review.id}
              className="border border-gray-100 p-8 bg-white rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <Card.Content className="p-0 space-y-6 flex flex-col justify-between h-full">
                
                {/* Visual Quote Icon Bracket Design Asset */}
                <div className="text-4xl font-serif text-indigo-200 leading-none h-4">“</div>

                {/* Main Quote Text Body Block */}
                <blockquote className="text-sm text-gray-600 leading-relaxed font-medium italic relative z-10">
                  {review.quote}
                </blockquote>

                {/* Rating Block Separator Line Layout */}
                <div className="flex gap-0.5 text-amber-400 text-xs pt-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <hr className="border-gray-50 my-1" />

                {/* Profile Identity Context Header Block */}
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={`${review.name} avatar profile`}
                    className="w-11 h-11 rounded-full object-cover border border-gray-100 bg-gray-50"
                  />
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-sm tracking-tight">
                      {review.name}
                    </h4>
                    <p className="text-[11px] font-medium text-gray-400 truncate max-w-[170px]">
                      {review.role}
                    </p>
                  </div>
                </div>

              </Card.Content>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}