const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Example modification inside your lib/Action/publicAPI.js file:
export const getOpenTasks = async (page = 1, limit = 6, search = "", category = "all") => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search,
    category: category
  });

  const response = await fetch(`${baseUrl}/api/public/tasks/open?${queryParams.toString()}`);
  if (!response.ok) throw new Error("Network error occurred");
  return await response.json(); 
};

// Fetch a single task by its database ID
export const getSingleTask = async (taskId) => {
  const res = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch task details");
  return res.json();
};

export const getAllFreelancers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/public/freelancers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error("Could not retrieve freelancer marketplace directory.");
    return await res.json();
  } catch (error) {
    console.error("API Error in getAllFreelancers:", error);
    throw error;
  }
};
