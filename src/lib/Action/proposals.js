import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Submit freelancer proposal payload
export const submitProposal = async (proposalData) => {
  const { data: tokenData } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/proposals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify(proposalData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to submit proposal");
  return data;
};

export const getFreelancerProposalsById = async (freelancerId) => {
  if (!freelancerId) return [];
  const { data: tokenData } = await authClient.token();
  const res = await fetch(
    `${baseUrl}/api/freelancer/proposals?freelancerId=${freelancerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData.token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch proposals");
  }

  return res.json();
};


