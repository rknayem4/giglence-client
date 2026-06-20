const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Submit freelancer proposal payload
export const submitProposal = async (proposalData) => {
  const res = await fetch(`${baseUrl}/api/proposals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proposalData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to submit proposal");
  return data;
};



export const getFreelancerProposalsById = async (freelancerId) => {
  if (!freelancerId) return [];

  const res = await fetch(`${baseUrl}/api/freelancer/proposals?freelancerId=${freelancerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch proposals");
  }

  return res.json();
  };

export const getProposalsByTaskId = async (taskId) => {
  // Fix: Check for taskId, not clientId
  if (!taskId) return []; 

  const res = await fetch(`${baseUrl}/api/client/proposals?taskId=${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch proposals for this task");
  }

  return res.json();
};