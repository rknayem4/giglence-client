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

