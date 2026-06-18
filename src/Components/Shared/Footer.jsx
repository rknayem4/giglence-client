import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                width={180}
                height={60}
                alt="Giglance Logo"
                className="object-contain"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-default-500">
              Connect with skilled freelancers and get high-quality digital
              services delivered quickly, reliably, and affordably.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#333333]">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/" className="transition hover:text-[#3B82F6]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/jobs" className="transition hover:text-[#3B82F6]">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/freelancers"
                  className="transition hover:text-[#3B82F6]"
                >
                  Freelancers
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-[#3B82F6]">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-[#3B82F6]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#333333]">
              Contact
            </h3>

            <div className="space-y-3 text-gray-600">
              <p>support@giglance.com</p>
              <p>Dhaka, Bangladesh</p>
              <p>Available 24/7 Online</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#333333]">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: <FaFacebookF />,
                  link: "https://facebook.com",
                },
                {
                  icon: <FaXTwitter />,
                  link: "https://x.com",
                },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://linkedin.com",
                },
                {
                  icon: <FaGithub />,
                  link: "https://github.com",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {item.icon}
                </Link>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Join our community and discover new opportunities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Giglance. All rights reserved.
            </p>

            <div className="h-1 w-40 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
