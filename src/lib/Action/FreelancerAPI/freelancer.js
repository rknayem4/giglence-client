const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSummaryOverviewFreelancer = async (email) => {
  if (!email) return null;

  const res = await fetch(
    `${baseUrl}/api/freelancer/dashboard-summary?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch freelancer metric summaries");
  return res.json();
};

/**
 * Fetches payout transaction records matching a specific freelancer
 * @param {string} email - The logged-in freelancer's email address
 */
export const getPaymentsForFreelancer = async (email) => {
  try {
    if (!email) return [];

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

    const res = await fetch(
      `${baseUrl}/api/freelancer/payments?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store", // Bypasses Next.js caching layers to show real-time incoming transfers
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to load payment history grid. Status: ${res.status}`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Freelancer earnings fetch error failure:", error);
    return [];
  }
};
