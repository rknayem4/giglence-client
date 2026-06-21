"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="flex min-h-[85vh] flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="mb-6 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-[#3B82F6] animate-fade-in">
            🚀 Connect Clients & Freelancers Faster
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-[#333333] md:text-6xl lg:text-7xl">
            Get your tasks done by{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              skilled freelancers
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Post your task, receive offers from talented freelancers,
            compare proposals, and get quality work delivered quickly and
            securely—all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/freelancers"
              className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Browse Freelancers
            </Link>

            <Link
              href="/tasks"
              className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-[#333333] transition-all duration-300 hover:border-[#3B82F6] hover:text-[#3B82F6]"
            >
              Browse Tasks
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;