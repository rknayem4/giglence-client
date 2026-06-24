import { authClient } from "@/lib/auth-client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getProposalsByTaskId = async (taskId) => {
  // Fix: Check for taskId, not clientId
  if (!taskId) return [];
  const { data: tokenData } = await authClient.token();
  // console.log("Token Data:", tokenData); // Debugging line to check tokenData

  const res = await fetch(`${baseUrl}/api/client/proposals?taskId=${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch proposals for this task");
  }

  return res.json();
};
