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


/**
 * Fetches targeted billing transaction ledgers matching a specific client
 * @param {string} email - The logged in client's email address
 */
export const getPaymentsForClient = async (email) => {
  try {
    if (!email) return [];

    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    
    // Explicitly append client email context into the query params string
    const res = await fetch(`${baseUrl}/api/client/payments?email=${encodeURIComponent(email)}`, {
      cache: 'no-store' // Ensures live financial analytics bypass static generation caching builds
    });

    if (!res.ok) {
      throw new Error(`Failed network transmission step: Status code ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Client billing metrics fetch failure:", error);
    return [];
  }
};