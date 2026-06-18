"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowLeft, FaHouse } from "react-icons/fa6";
import NavBar from "@/Components/Shared/NavBer";
import Footer from "@/Components/Shared/Footer";

export default function NotFound() {
  return (
    <>
    <NavBar></NavBar>
      <div className="flex min-h-[80vh] items-center justify-center px-6 bg-white">
        <div className="max-w-xl text-center">
          {/* 404 */}
          <h1 className="text-8xl md:text-9xl font-extrabold">
            <span className="text-[#3B82F6]">4</span>
            <span className="text-[#8B5CF6]">0</span>
            <span className="text-[#3B82F6]">4</span>
          </h1>

          {/* Heading */}
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-[#333333]">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-500 leading-7">
            Sorry, the page you're looking for doesn't exist or may have been
            moved. Let's get you back on track.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="mt-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 py-3 text-white"
            >
              Back Home
            </Link>
          </div>

          {/* Decorative circles */}
          <div className="relative mt-16 hidden md:block">
            <div className="absolute -left-10 h-20 w-20 rounded-full bg-[#3B82F6]/10"></div>
            <div className="absolute right-0 h-32 w-32 rounded-full bg-[#8B5CF6]/10"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
