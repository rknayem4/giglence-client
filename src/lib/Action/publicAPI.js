const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOpenTasks = async () => {
  const res = await fetch(`${baseUrl}/api/public/tasks/open`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch open tasks");
  }

  return res.json();
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
