import { authClient } from "../auth-client";

// Ensure this file is designated for your API helpers
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createTask = async (newJobData) => {
  const { data: tokenData } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/client/task-post`, {
    // Removed trailing slash
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`,
    },
    body: JSON.stringify(newJobData),
  });

  if (!res.ok) {
    throw new Error("Failed to post task");
  }

  return res.json();
};

export const getClientTasks = async (clientId) => {
  const { data: tokenData } = await authClient.token();
  if (!clientId) return [];
  const res = await fetch(`${baseUrl}/api/client/tasks?clientId=${clientId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch client tasks");
  }

  return res.json();
};

export const updateClientTask = async (taskId, updatedTaskData) => {
  const { data: tokenData } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/client/task-edit/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenData?.token}`,
    },
    body: JSON.stringify(updatedTaskData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update task");
  }

  return data;
};
