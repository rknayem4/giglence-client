"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Envelope,
  Briefcase,
  Link as LinkIcon,
  Globe,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FaLaptop } from "react-icons/fa6";

export default function FreelancerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.freelancer) return;

    const fetchFreelancerProfile = async () => {
      try {
        setLoading(true);

        // FIX: Pointed target endpoint exactly to your Express backend port 8000 setup
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(
          `${baseUrl}/api/public/freelancer/${params.freelancer}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!res.ok) {
          throw new Error(
            "Profile dataset could not be successfully resolved.",
          );
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        toast.error(err.message || "Error accessing profile files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerProfile();
  }, [params?.freelancer]);

  // console.log(params.freelancer, profile);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 font-medium">
        Loading freelancer portfolio assets...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-700">Profile Not Found</h3>
        <p className="text-sm text-gray-400 mt-2">
          The profile you are trying to view does not exist or has been removed.
        </p>
        <Button
          onClick={() => router.back()}
          className="mt-5 bg-gray-100 rounded-xl"
        >
          Go Back
        </Button>
      </div>
    );
  }

  // FIX: Normalized validation mapping keys to handle both id formats safely
  const currentUserId = session?.user?.id || session?.user?._id;
  const isOwnProfile = currentUserId === profile._id;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back to Marketplace Link Row */}
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition mb-8"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Directory Marketplace
      </button>

      {/* Main Profile Dashboard Frame Container */}
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Essential Identification Info & Quick Action Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl text-center flex flex-col items-center">
            {/* User Profile Avatar Frame Layout */}
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5 shadow-md mb-4">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-full w-full object-cover rounded-[22px] bg-white"
                />
              ) : (
                <div className="h-full w-full bg-white rounded-[22px] flex items-center justify-center text-gray-700 font-bold text-2xl uppercase">
                  {profile.name ? profile.name.substring(0, 2) : "FL"}
                </div>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-800 leading-snug">
              {profile.name || "Independent Contractor"}
            </h1>

            <p className="text-sm font-semibold text-blue-600 bg-blue-50/60 border border-blue-100/50 rounded-xl px-3 py-1 mt-2 inline-flex items-center gap-1.5 capitalize">
              <FaLaptop size={14} /> {profile.title || "Specialist Onboarder"}
            </p>

            <div className="w-full border-t border-gray-50 my-5 pt-4 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Envelope size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Briefcase size={16} className="text-gray-400 shrink-0" />
                <span>
                  Experience:{" "}
                  <strong className="text-gray-800">
                    {profile.experience || "Not Declared"}
                  </strong>
                </span>
              </div>
            </div>

            {/* Quick Action Interactive Engagement Handlers */}
            <div className="w-full space-y-2 mt-2">
              {isOwnProfile ? (
                <Button
                  onClick={() =>
                    router.push("/dashboard/freelancer/edit-profile")
                  }
                  className="w-full h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold tracking-wide transition"
                >
                  Edit My Profile Settings
                </Button>
              ) : (
                <a href={`mailto:${profile.email}`} className="block w-full">
                  <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold tracking-wide shadow-md transition">
                    Contact via Email
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Social Profiles / External Connections Card Block */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              External Profiles
            </h3>
            <div className="space-y-3">
              {profile.portfolio ? (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-blue-600 transition bg-gray-50 hover:bg-blue-50/40 p-3 rounded-xl border border-gray-100"
                >
                  <Globe size={16} className="text-gray-400" />
                  <span className="truncate">Personal Portfolio</span>
                </a>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No custom portfolio url listed.
                </p>
              )}

              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-blue-600 transition bg-gray-50 hover:bg-blue-50/40 p-3 rounded-xl border border-gray-100"
                >
                  <LinkIcon size={16} className="text-gray-400" />
                  <span className="truncate">LinkedIn Network Connect</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right Column: Bio Details, Core Skills Matrix & Credentials */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Professional Overview Bio Summary */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">
              Professional Biography
            </h2>
            {profile.bio ? (
              <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            ) : (
              <p className="text-gray-400 italic text-sm">
                This freelancer has not added a detailed descriptive bio
                narrative yet.
              </p>
            )}
          </div>

          {/* Section: Complete Verified Skills Chip Array Grid */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">
              Technical Expertise & Core Skills
            </h2>

            {Array.isArray(profile.skills) && profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold bg-gray-50 text-gray-700 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 px-3.5 py-1.5 rounded-xl transition duration-150 shadow-sm capitalize"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">
                No indexed validation target skills have been configured on this
                account.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
