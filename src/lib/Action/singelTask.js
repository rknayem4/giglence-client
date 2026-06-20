// Ensure your base URL is correctly resolved on the client side
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

/**
 * Fetches a single task by its unique ID.
 * Safe to call directly inside client-side useEffects or state initializers.
 * * @param {string} taskId - The unique identifier of the task in MongoDB
 * @returns {Promise<Object>} The task data object
 */
export const getSingleTaskForClient = async (taskId) => {
  if (!taskId) {
    console.warn("getSingleTask was invoked without a valid taskId parameter.");
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json" 
      },
      // Ensures the client fetches fresh data if task attributes or statuses alter
      cache: "no-store" 
    });

    if (!res.ok) {
      // Parse the error message if the backend sends structured JSON details
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error inside getSingleTask API client utility for ID (${taskId}):`, error);
    throw error; // Re-throw so your component can display an error toast UI
  }
};