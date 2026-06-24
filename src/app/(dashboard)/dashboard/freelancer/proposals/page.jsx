"use client";

import { useEffect, useState } from "react";
import { Briefcase, Coins, Calendar, FileText } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getFreelancerProposalsById } from "@/lib/Action/proposals";
import ProposalsFreeCard from "@/Components/FreelancerCom/ProposalsFreeCard";

export default function FreelancerProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocked freelancer authenticated session data
const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchProposals = async () => {
      // Check for ID presence before triggering the API layout query pass
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        const data = await getFreelancerProposalsById(session.user.id);
        setProposals(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch your active applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [session?.user?.id]); // Re-run effect whenever the User ID loads or mutates



  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Loading your applications...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Layout Heading */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-extrabold text-[#333333] tracking-tight">
          My Submitted Proposals
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Track, monitor status, and review details of your active bids and
          portfolio proposals.
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Briefcase size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">
            No Proposals Sent
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Explore open project listings to start pitching your services.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((item) => (
            <ProposalsFreeCard item={item}  key={item._id}/>
          ))}
        </div>
      )}
    </div>
  );
}
