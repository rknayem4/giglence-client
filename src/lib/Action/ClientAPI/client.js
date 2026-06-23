const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSummaryOverviewClient = async (email) => {
  if (!email) return null;
  
  const res = await fetch(`${baseUrl}/api/client/dashboard-summary?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store" // Ensure fresh dashboard metrics on each page load
  });
  
  if (!res.ok) throw new Error("Failed to fetch client task data metrics");
  return res.json();
};