"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSmartRedirect = () => {
    if (!session?.user) {
      router.replace("/login");
      return;
    }

    // Dynamic recovery redirection mapping based on actual role
    const userRole = session.user.role;
    if (userRole === "admin") router.replace("/dashboard/admin");
    else if (userRole === "freelancer") router.replace("/dashboard/freelancer");
    else if (userRole === "client") router.replace("/dashboard/client");
    else router.replace("/");
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl">
        
        {/* Guard Shield Warning Icon Layout */}
        <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
          <svg 
            className="w-8 h-8 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              pathLength={1}
              d="M12 15v2m0-8v4m-3.5 4.5h7c1.38 0 2.5-1.12 2.5-2.5v-5c0-1.38-1.12-2.5-2.5-2.5h-7A2.5 2.5 0 006 9.5v5c0 1.38 1.12 2.5 2.5 2.5z" 
            />
          </svg>
        </div>

        {/* Messaging Block Context */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Security Gate Access Denied
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
            Your current platform identity token doesn't hold the clearance level required to view this administrative dashboard environment directory.
          </p>
        </div>

        {/* Action Button Controls */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            className="text-xs font-bold px-5 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition"
          >
            Go Back
          </Button>
          
          <Button
            onClick={handleSmartRedirect}
            className="text-xs font-bold px-6 h-10 bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/10 rounded-xl transition"
          >
            Return to Dashboard Home
          </Button>
        </div>
        
      </div>
    </main>
  );
}