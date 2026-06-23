const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSummaryOverviewFreelancer = async (email) => {
  if (!email) return null;
  
  const res = await fetch(`${baseUrl}/api/freelancer/dashboard-summary?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to fetch freelancer metric summaries");
  return res.json();
};