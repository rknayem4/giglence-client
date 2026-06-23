const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSummaryOverviewAdmin = async () => {
  const res = await fetch(`${baseUrl}/api/admin/dashboard-summary`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch task details");
  return res.json();
}