"use client";

import Link from "next/link";
import { use, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { UserProfile } from "./UserProfile";

const NavBar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const isLoggedIn = session;

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tasks", href: "/tasks" },
    { name: "Browse Freelancers", href: "/freelancers" },

    ...(session?.user.role == "client"
      ? [{ name: "Dashboard", href: "/dashboard/client" }]
      : []),
    ...(session?.user.role == "freelancer"
      ? [{ name: "Dashboard", href: "/dashboard/freelancer" }]
      : []),
    ...(session?.user.role == "admin"
      ? [{ name: "Dashboard", href: "/dashboard/admin" }]
      : []),
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex gap-4">
            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
              {isOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                width={180}
                height={60}
                alt="Giglance Logo"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {publicLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-[#333333] transition hover:text-[#3B82F6]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className=" items-center gap-4">
            {!isLoggedIn ? (
              <Link
                href="/auth/login"
                className="rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105"
              >
                Login
              </Link>
            ) : (
              <div className="flex justify-center gap-3 items-center">
                <UserProfile user={user} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-[#333333] hover:text-[#3B82F6]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
